import { Component, computed, effect, input, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableColumn, TableData } from './table.models';
import { DatePipe } from '@angular/common';
import { TruncateTextDirective } from '../../directives/truncate-text.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { getStatusLabel, OrderStatus } from '../../../core/models/Order';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, TruncateTextDirective, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {

  public columns = input<TableColumn[]>([]);
  public data = input<TableData<T> []>([]);
  public showActions = input<boolean>(true);
  public showDetails = input<boolean>(true);
  public showDelete = input<boolean>(false);
  public showEdit = input<boolean>(false);
  public detailsClick = output<T>();
  public deleteClick = output<T>();
  public editClick = output<T>();
  
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  public displayedColumns = computed(() => this.columns().map(column => column.field).concat(this.showActions() ? 'actions' : []));

  public dataSource = new MatTableDataSource<T>();

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource<T>(this.data());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public details(element: T) {
    this.detailsClick.emit(element);
  }

  public deleteElement(element: T) {
    this.deleteClick.emit(element);
  }

  public editElement(element: T) {
    this.editClick.emit(element);
  }

  public getStatusLabel(status: OrderStatus): string {
    return getStatusLabel(status);
  }
}
