export interface TableMenu {
  styleClass: string;
  icon: string;
  payload: (any) => string;
  action: string;
  description: string;
}
