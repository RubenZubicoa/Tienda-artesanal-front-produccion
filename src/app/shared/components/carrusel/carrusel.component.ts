import { Component, input, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit, OnDestroy {
  // Inputs
  public images = input.required<string[]>();
  public autoPlay = input<boolean>(false);
  public autoPlayInterval = input<number>(3000); // en milisegundos
  public showIndicators = input<boolean>(true);
  public showNavigation = input<boolean>(true);
  private readonly imageUrl = 'http://localhost:3000/';
  private readonly sanitizer = inject(DomSanitizer);
  // Estado interno
  public currentIndex = signal<number>(0);
  private autoPlayTimer?: ReturnType<typeof setInterval>;

  // Computed
  public totalItems = computed(() => this.images().length);

  ngOnInit(): void {
    if (this.autoPlay() && this.totalItems() > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  public next(): void {
    if (this.totalItems() === 0) return;
    const nextIndex = (this.currentIndex() + 1) % this.totalItems();
    this.currentIndex.set(nextIndex);
    this.resetAutoPlay();
  }

  public previous(): void {
    if (this.totalItems() === 0) return;
    const prevIndex = (this.currentIndex() - 1 + this.totalItems()) % this.totalItems();
    this.currentIndex.set(prevIndex);
    this.resetAutoPlay();
  }

  public goTo(index: number): void {
    if (index >= 0 && index < this.totalItems()) {
      this.currentIndex.set(index);
      this.resetAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.autoPlayInterval());
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private resetAutoPlay(): void {
    if (this.autoPlay()) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  public getCurrentImage(): SafeUrl {
    const images = this.images();
    if (images.length === 0) return '';
    const image = images[this.currentIndex()];
    if (image.includes('uploads')) {
      return this.sanitizer.bypassSecurityTrustUrl(this.imageUrl + image);
    }
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }
}
