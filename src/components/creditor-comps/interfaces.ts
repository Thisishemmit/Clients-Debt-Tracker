// interfaces.ts

export interface IPayment {
  id: number
  amount: number;
  type: 'IN' | 'OUT';
  category: string | null | undefined
  year: number;
  month: number;
  date: string; // Change Date type to string
}

export interface IClient {
  id: number
  name: string;
  contact: string;
  debt: number;
  pending: number;
  year: number;
  date: string; // Change Date type to string
  payments: IPayment[];
}
