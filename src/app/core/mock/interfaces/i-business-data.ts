import { BusinessData } from './business-data';

export interface IBusinessData {
  data: BusinessData[];
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  failed: boolean;
  message: string;
  succeeded: boolean;
  errors: [];
}
