import { ChangeDetectionStrategy, Component, OnDestroy, output, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CdkOverlayOrigin, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { first } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatDividerModule, OverlayModule, MatTooltipModule, MatIconModule],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterButtonComponent implements OnDestroy {
  public applyFilters = output<void>();
  public clearFilters = output<void>();

  public isMenuOpen = signal<boolean>(false);
  @ViewChild('menuTemplate') menuTemplate!: TemplateRef<any>;

  public overlayRef: OverlayRef | undefined = undefined;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  openMenu(trigger: CdkOverlayOrigin) {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }

    const buttonRect = trigger.elementRef.nativeElement.getBoundingClientRect();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(trigger.elementRef) 
      .withFlexibleDimensions(true)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: buttonRect.y, 
          offsetX: -32
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true, 
      backdropClass: 'cdk-overlay-transparent-backdrop', 
    });

    const portal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.isMenuOpen.set(true);

    this.overlayRef.backdropClick().pipe(first()).subscribe(() => this.closeMenu());
  }

  closeMenu() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.isMenuOpen.set(false);
  }

  applyFiltersClick() {
    this.applyFilters.emit();
    this.closeMenu();
  }
  
  clearFiltersClick() {
    this.clearFilters.emit();
    this.closeMenu();
  }
}
