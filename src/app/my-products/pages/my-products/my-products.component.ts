import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Product } from '../../../core/models/Product';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { AddProductDialogComponent } from '../../components/add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
  selector: 'app-my-products',
  imports: [CommonModule, BreadcrumbsComponent, CardComponent],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);
  private readonly toastService = inject(ToastService);
  private readonly currentUserService = inject(CurrentUserService);

  public products = signal<Product[]>([]);
  public cards = computed(() => this.products().map(mapProductToCardData));

  ngOnInit(): void {
    if (this.currentUserService.isManufacturer()) {
      this.getProducts();
    } else {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener productos', 'No tienes un fabricante asociado, por favor contacta al administrador o inicia sesión como fabricante');
    }
  }

  public getProducts() {
    this.productsService.getProductsByManufacturer(this.currentUserService.currentUser()?.manufacturerId ?? '').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener productos', 'No se han podido obtener los productos');
      }
    });
  }

  public openFormDialog(uuid?: Product['uuid']) {
    const product = uuid ? this.products().find(product => product.uuid === uuid) : undefined;
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {
        product: product
      }
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result?.success) {
        this.getProducts();
      }
    });
  }

  public removeProduct(uuid: Product['uuid']) {
      this.productsService.deleteProduct(uuid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto eliminado', 'El producto ha sido eliminado correctamente');
          this.getProducts();
        },
        error: (error) => {
          this.toastService.showMessage(ToastTypes.ERROR, 'Error al eliminar producto', 'No se ha podido eliminar el producto');
        }
      });
  }
}
