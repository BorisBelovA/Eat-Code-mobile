export type HttpResponse<T> = {
  readonly status: 'OK' | 'FAILED';
  readonly items: T;
  readonly message: string;
};
