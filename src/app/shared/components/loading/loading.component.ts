import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {

  public  readonly loadingService = inject(LoadingService)

}
