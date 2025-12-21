import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { mapManufacturerToCardData } from '../../../shared/components/card/card.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturers-dialog',
  imports: [CardComponent, CommonModule],
  templateUrl: './manufacturers-dialog.component.html',
  styleUrl: './manufacturers-dialog.component.scss'
})
export class ManufacturersDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ManufacturersDialogComponent>);
  private readonly data = inject<{ manufacturer: Manufacturer }>(MAT_DIALOG_DATA);
  private readonly router = inject(Router);
  
  public manufacturer = signal<Manufacturer | undefined>(undefined);
  public manufacturerCard = computed(() =>{
    if(!this.manufacturer()) return undefined;
    return mapManufacturerToCardData(this.manufacturer()!);
  });

  ngOnInit(): void {
    this.manufacturer.set(this.data.manufacturer);
  }

  public goToManufacturersDetails() {
    this.router.navigate(['/manufacturers', this.manufacturerCard()!.uuid]);
    this.dialogRef.close();
  }
}
