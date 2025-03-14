export type ID = string | number;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}