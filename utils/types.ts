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

// Assuming your types might look something like this:
export type DailyLimit = {
  amount: number;
  date: Date; // Date for which the limit is set
};

export type WeeklyLimit = {
  amount: number;
  startDate: Date; // Start date of the week
};

export type MonthlyLimit = {
  amount: number;
  month: number; // Month for which the limit is set (0 for January, 11 for December)
  year: number; // Year for which the limit is set
};
