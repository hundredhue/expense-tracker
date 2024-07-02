import React, { createContext, useContext, useEffect, useState } from "react";
import { Category, Transaction, TransactionsByMonth } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite/next";

type TransactionsContextType = {
  categories: Category[];
  transactions: Transaction[];
  transactionsByMonth: TransactionsByMonth;
  totalAmount: number;
  totalExpenses: number;
  totalIncome: number;
  getData: () => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsByMonth, setTransactionsByMonth] =
    useState<TransactionsByMonth>({
      totalExpenses: 0,
      totalIncome: 0,
    });
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const db = useSQLiteContext();

  const getData = async () => {
    try {
      const result = await db.getAllAsync<Transaction>(
        `SELECT * FROM Transactions 
         ORDER BY date DESC
         LIMIT 30;`
      );
      setTransactions(result);

      const categoriesResult = await db.getAllAsync<Category>(
        `SELECT * FROM Categories;`
      );
      setCategories(categoriesResult);

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

      const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
      const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

      const transactionsByMonth = await db.getAllAsync<TransactionsByMonth>(
        `
        SELECT
          COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
          COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
        FROM Transactions
        WHERE date >= ? AND date <= ?;
      `,
        [startOfMonthTimestamp, endOfMonthTimestamp]
      );
      setTransactionsByMonth(transactionsByMonth[0]);

      const totalAmountResult = await db.getAllAsync<{ totalAmount: number }>(
        `SELECT SUM(amount) AS totalAmount FROM Transactions;`
      );
      setTotalAmount(totalAmountResult[0]?.totalAmount || 0);

      const totalExpensesResult = await db.getAllAsync<{
        totalExpenses: number;
      }>(
        `SELECT SUM(amount) AS totalExpenses FROM Transactions WHERE type = 'Expense';`
      );
      setTotalExpenses(totalExpensesResult[0]?.totalExpenses || 0);

      const totalIncomeResult = await db.getAllAsync<{ totalIncome: number }>(
        `SELECT SUM(amount) AS totalIncome FROM Transactions WHERE type = 'Income';`
      );
      setTotalIncome(totalIncomeResult[0]?.totalIncome || 0);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [db]);

  return (
    <TransactionsContext.Provider
      value={{
        categories,
        transactions,
        transactionsByMonth,
        totalAmount,
        totalExpenses,
        totalIncome,
        getData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionsContext must be used within a TransactionsProvider"
    );
  }
  return context;
};
