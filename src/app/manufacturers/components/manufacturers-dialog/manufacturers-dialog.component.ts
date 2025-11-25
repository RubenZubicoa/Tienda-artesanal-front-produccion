import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
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
  private readonly data = inject<{ manufacturerId: string }>(MAT_DIALOG_DATA);
  private readonly router = inject(Router);
  
  public manufacturer = signal<Manufacturer | undefined>(undefined);
  public manufacturerCard = computed(() =>{
    if(!this.manufacturer()) return undefined;
    return mapManufacturerToCardData(this.manufacturer()!);
  });

  ngOnInit(): void {
    this.manufacturer.set(MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === this.data.manufacturerId));
  }

  public goToManufacturersDetails(manufacturerId: string) {
    this.router.navigate(['/manufacturers', manufacturerId]);
    this.dialogRef.close();
  }
}
