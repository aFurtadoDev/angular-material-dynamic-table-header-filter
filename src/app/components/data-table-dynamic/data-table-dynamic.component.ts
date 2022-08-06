import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppTranslationService } from '../../core/services/app-translation.service';
import { TableBtn, TableColumn } from '../../core/interfaces';
import { TableMenu } from '../../core/interfaces/table-menu';
import { timer } from 'rxjs';

@Component({
  selector: 'app-data-table-dynamic',
  templateUrl: './data-table-dynamic.component.html',
  styleUrls: ['./data-table-dynamic.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DataTableDynamicComponent
  implements OnChanges, OnInit, AfterViewInit
{
  formGroup: FormGroup = new FormGroup({});
  columns: TableColumn[] = [];

  @Input() toolbar = true;
  @Input() toolbarTitle = '';
  @Input('columns') set _columns(value) {
    this.columns = value;
    value.forEach((x) => {
      this.formGroup.addControl(x.columnDef, new FormControl());
    });

    this.formGroup.addControl('_general', new FormControl());
    this.formGroup.valueChanges.subscribe((res) => {
      this.dataSource.filter = JSON.stringify(res);
    });
  }
  @Input() buttons: TableBtn[] = [];
  @Input() menuButtons: TableMenu[] = [];
  @Input() data: any[] = [];
  @Input() filterGlobal = false;
  @Input() filterGlobalLabel = 'Filter';
  @Input() filterGlobalPlaceholder = 'Filter...';
  @Input() filterColumns = true;
  @Input() filterColumnsLabel = 'Type to search';
  @Input() filterColumnsPlaceholder = 'Type to search...';
  @Input() expandDetail = false;
  @Input() footer: string = null;
  // @Input() length: number;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;
  @Input() tableMinWidth = 500;
  @Input() isLoadingResults = false;
  @Input() isLoadingResultsFilter = false;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();
  @Output() rowDblClick = new EventEmitter();
  @Output() modalButtonClick = new EventEmitter();
  @Output() pageChange = new EventEmitter<PageEvent>();

  @Input() tableTemplate: TemplateRef<any>;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[];
  displayedColumnsSearch: string[];

  headers: string[] = this.columns.map((x) => x.columnDef);
  // headersFilters = this.headers.map((x, i) => x + '_' + i);
  filtersModel = [];
  filterKeys = {};

  filterValue = '';

  toggleFilters = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  gT = (key: string | Array<string>, interpolateParams?: object) =>
    this.translationService.getTranslation(key, interpolateParams);

  constructor(
    private translationService: AppTranslationService,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.matTableSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (changes.data) {
        this.dataSource = new MatTableDataSource<any>(this.data);

        this.dataSource.filterPredicate = (data?: any, filter?: string) => {
          const filterData = JSON.parse(filter);
          let colMatch = true;
          if (filterData._general) {
            const search = filterData._general.toLowerCase();
            colMatch = false;
            // tslint:disable-next-line: forin
            for (const prop in data) {
              colMatch =
                colMatch ||
                ('' + data[prop]).toLowerCase().indexOf(search) >= 0;
            }
          }
          Object.keys(filterData).forEach((x) => {
            if (x !== '_general' && filterData[x]) {
              if (colMatch)
                colMatch =
                  ('' + data[x])
                    .toLowerCase()
                    .indexOf(filterData[x].toLowerCase()) >= 0;
            }
          });
          return colMatch;
        };

        this.matTableSort();

        this.displayedColumns = [...this.columns.map((c) => c.columnDef)];
        this.displayedColumnsSearch = [
          ...this.columns.map((c) => c.columnSearch),
          'filter',
        ];

        // console.log(this.displayedColumnsSearch);

        this.columns.forEach((value, index) => {
          this.filterKeys[this.columns[index].columnDef] = '';
        });

        if (this.buttons.length > 0)
          this.displayedColumns = [...this.displayedColumns, 'actions'];

        if (this.expandDetail) {
          this.displayedColumns = ['expand', ...this.displayedColumns];
          this.displayedColumnsSearch = [
            'expand',
            ...this.displayedColumnsSearch,
          ];

          this.dataSource.paginator = this.paginator;
        }
        // console.log(this.displayedColumns)
        // console.log(this.displayedColumnsSearch)
      }
    }
  }

  clearFilters(): void {
    this.formGroup.reset();
  }

  matTableSort(): void {
    timer(0).subscribe(() => {
      this.dataSource.sort = this.sort ? this.sort : null;

      this.dataSource.paginator = this.paginator;

      // console.log(this.columns.filter((x) => x.activeSort === true).map(m => m.columnDef).toString());

      const directionSort = `${this.columns
        .filter((x) => x.activeSort === true)
        .map((m) => m.directionSort)
        .toString()}`;

      const sortState: Sort = {
        active: `${this.columns
          .filter((x) => x.activeSort === true)
          .map((m) => m.columnDef)
          .toString()}`,
        direction: directionSort === 'asc' ? 'asc' : 'desc',
      };

      this.dataSource.sort.active = sortState.active;
      this.dataSource.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
}
