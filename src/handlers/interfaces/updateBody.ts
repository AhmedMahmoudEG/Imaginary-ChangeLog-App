export interface CreateUpdateBody {
  productID: string;
  title: string;
  body: string;
  status?: string;
  version?: string;
  asset?: string;
  updatedAt?: string;
}