import { Component, computed, effect, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableColumn, TableDataWithStatus } from './table.models';
import { DatePipe } from '@angular/common';
import { TruncateTextDirective } from '../../directives/truncate-text.directive';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, TruncateTextDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {

  public columns = input<TableColumn[]>([]);
  public data = input<TableDataWithStatus<T>[]>([]);
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  public displayedColumns = computed(() => this.columns().map(column => column.field));

  public dataSource = new MatTableDataSource<T>();

  constructor() {
    effect(() => {
      console.log(this.data());
      console.log(this.displayedColumns());
      this.dataSource = new MatTableDataSource<T>(this.data());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
