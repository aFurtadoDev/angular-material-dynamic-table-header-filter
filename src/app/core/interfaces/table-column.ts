export interface TableColumn {
  columnDef: string;
  columnSearch: string;
  header: string;
  cell: (any) => string;
}
