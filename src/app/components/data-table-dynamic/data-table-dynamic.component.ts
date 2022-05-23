import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableBtn, TableColumn } from '../../core/interfaces';
import { TableMenu } from '../../core/interfaces/table-menu';

@Component({
  selector: 'app-data-table-dynamic',
  templateUrl: './data-table-dynamic.component.html',
  styleUrls: ['./data-table-dynamic.component.scss'],
})
export class DataTableDynamicComponent implements OnChanges, OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() menuButtons: TableMenu[] = [];
  @Input() data: any[] = [];
  @Input() filter: boolean = false;
  @Input() filterPlaceholder: string = 'Filter';
  @Input() columnsFilter: boolean = false;
  @Input() footer: string = null;
  @Input() pagination: number[] = [];
  @Input() pageSize: number;
  @Input() tableMinWidth: number = 500;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  displayedColumnsSearch: string[];

  headers: string[] = this.columns.map((x) => x.columnDef);
  headersFilters = this.headers.map((x, i) => x + '_' + i);
  filtersModel = [];
  filterKeys = {};

  toggleFilters = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.data) {
      if (changes.data) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.filterPredicate = (item, filter: string) => {
          const colMatch = !Object.keys(this.filterKeys).reduce(
            (remove, field) => {
              return (
                remove ||
                !item[field]
                  .toString()
                  .toLocaleLowerCase()
                  .includes(this.filterKeys[field])
              );
            },
            false
          );
          return colMatch;
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.columns.map((c) => c.columnDef)];
        this.displayedColumnsSearch = [
          ...this.columns.map((c) => c.columnSearch),
          'filter',
        ];

        this.columns.forEach((value, index) => {
          this.filterKeys[this.columns[index].columnDef] = '';
        });
        if (this.buttons.length > 0)
          this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }

  searchColumns() {
    this.filtersModel.forEach((each, ind) => {
      this.filterKeys[this.columns[ind].columnDef] = each || '';
    });
    //Call API with filters
    this.dataSource.filter = JSON.stringify(this.filterKeys);
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }

  clearFilters() {
    this.filtersModel = [];
    this.columns.forEach((value, index) => {
      this.filterKeys[this.columns[index].columnDef] = '';
    });
    //Call API without filters
    this.searchColumns();
  }
}
