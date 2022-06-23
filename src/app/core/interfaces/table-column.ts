export interface TableColumn {
  columnDef: string;
  columnSearch: string;
  header: string;
  cell: (any) => string;
  sort: boolean;
  directionSort: string;
  activeSort: boolean;
}
