import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EnumsService } from '../../../core/services/enums.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductFormService } from '../../services/product-form.service';
import { ProductsService } from '../../../products/services/products.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { AddProduct, Product } from '../../../core/models/Product';
import { CarruselComponent } from '../../../shared/components/carrusel/carrusel.component';
import { AddProductImage } from '../../../core/models/ProductImage';
import { ProductImagesService } from '../../../products/services/product-images.service';
import { InsertOneResult } from '../../../core/models/InsertOneResult';

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CarruselComponent
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent implements OnInit {
  private readonly enumsService = inject(EnumsService);
  private readonly productFormService = inject(ProductFormService);
  private readonly productsService = inject(ProductsService);
  private readonly dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly data = inject<{ product?: Product }>(MAT_DIALOG_DATA);
  private readonly productImagesService = inject(ProductImagesService);
  
  public productForm = this.productFormService.crearFormulario();
  public categories = toSignal(this.enumsService.getCategories());

  public images = signal<string[]>([]);
  public isUpdateMode = signal<boolean>(false);
  private readonly MAX_IMAGES = 10;
  private imageFiles = signal<File[]>([]);

  ngOnInit(): void {
    if (this.data.product) {
      this.productFormService.actualizarFormulario(this.productForm, this.data.product);
      this.images.set(this.data.product.images);
      this.isUpdateMode.set(true);
      return
    }
    this.isUpdateMode.set(false);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (this.images().length >= this.MAX_IMAGES) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Límite de imágenes alcanzado', 
          `Solo puedes agregar hasta ${this.MAX_IMAGES} imágenes`
        );
        return;
      }

      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo inválido', 
          'Por favor selecciona un archivo de imagen'
        );
        return;
      }

      // Validar tamaño (por ejemplo, máximo 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo muy grande', 
          'El tamaño máximo permitido es 5MB'
        );
        return;
      }

      // Convertir archivo a base64
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        this.images.update((prev) => [...prev, base64String]);
        this.imageFiles.update((prev) => [...prev, file]);
      };
      reader.onerror = () => {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Error al leer archivo', 
          'No se pudo leer el archivo seleccionado'
        );
      };
      reader.readAsDataURL(file);

      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      input.value = '';
    }
  }

  public addImage(image: string) {
    if (this.images().length >= this.MAX_IMAGES) {
      return;
    }
    this.images.update((prev) => [...prev, image]);
  }

  public removeImage(index: number) {
    this.images.update((prev) => prev.filter((_, i) => i !== index));
    this.imageFiles.update((prev) => prev.filter((_, i) => i !== index));
  }

  public saveChanges(){
    if (this.isUpdateMode()) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  public removeImages() {
    this.images.set([]);
    this.imageFiles.set([]);
  }

  private addProduct() {
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.createProduct(product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result: InsertOneResult) => {
        this.addProductImages({...product, uuid: result.insertedId});
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'El producto no ha sido agregado correctamente');
        this.dialogRef.close( { success: false } );
      }
    });
  }

  private updateProduct() {
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.updateProduct(this.data.product?.uuid ?? '', product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto actualizado', 'El producto ha sido actualizado correctamente');
        this.dialogRef.close( { success: true, product: product } );
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al actualizar producto', 'El producto no ha sido actualizado correctamente');
        this.dialogRef.close( { success: false } );
      }
    });
  }

  private validateManufacturer() {
    if (!this.currentUserService.isManufacturer()) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'No tienes un fabricante asociado, por favor contacta al administrador');
      return;
    }
  }

  private addProductImages(product: Product) {
    const addProductImage: AddProductImage = {
      productId: product.uuid,
      images: this.imageFiles(),
    }
    this.productImagesService.addProductImages(addProductImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto actualizado', 'El producto ha sido actualizado correctamente');
        this.dialogRef.close( { success: true, product: product } );
      }
    });
  }
}
