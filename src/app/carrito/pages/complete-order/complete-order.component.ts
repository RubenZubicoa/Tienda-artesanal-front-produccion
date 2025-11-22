import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CompleteOrderFormComponent } from '../../components/complete-order-form/complete-order-form.component';

@Component({
  selector: 'app-complete-order',
  imports: [CommonModule, BreadcrumbsComponent, CompleteOrderFormComponent],
  templateUrl: './complete-order.component.html',
  styleUrl: './complete-order.component.scss'
})
export class CompleteOrderComponent {

}
