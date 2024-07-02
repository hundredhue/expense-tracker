export interface Cards {
  id: number;
  name: string;
  amount: number;
  type: "cash" | "bank" | "wallet";
  number: any;
}

export interface Transaction {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  description: string;
  type: "Expense" | "Income";
  card_id: number;
}

export interface Category {
  id: number;
  name: string;
  type: "Expense" | "Income";
}

export interface TransactionsByMonth {
  totalExpenses: number;
  totalIncome: number;
}
