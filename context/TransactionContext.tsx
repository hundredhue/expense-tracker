import React, { createContext, useContext, useEffect, useState } from "react";
import { Category, Transaction, TransactionsByMonth } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite/next";
import { useCardContext } from "./CardContext";

type TransactionsContextType = {
  categories: Category[];
  transactions: Transaction[];
  transactionsByMonth: TransactionsByMonth;
  totalAmount: number;
  totalExpenses: number;
  totalIncome: number;
  getData: () => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  monthlyExpenses: number;
  monthlyTransactions: {
    adjustedHeight?: number;
    id: string;
    height: number;
    color: string;
    month: string;
  }[];
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
  const [monthlyExpenses, setMonthlyExpenses] = useState<any>(0);
  const [monthlyTransactions, setMonthlyTransactions] = useState<
    {
      id: string;
      height: number;
      color: string;
      month: string;
      adjustedHeight?: number;
    }[]
  >([]);

  const { cards, updateCard } = useCardContext();

  const db = useSQLiteContext();

  const removeTransaction = async (id: number) => {
    try {
      // Find the transaction to be removed
      const transactionToRemove = transactions.find(
        (transaction) => transaction.id === id
      );
      if (!transactionToRemove) {
        throw new Error(`Transaction with id ${id} not found.`);
      }

      // Delete the transaction from the database
      await db.runAsync(`DELETE FROM Transactions WHERE id = ?`, [id]);

      // Update local transactions state
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);

      // Calculate the new total amount for the associated card
      const cardId = transactionToRemove.card_id;
      const remainingTransactions = updatedTransactions.filter(
        (transaction) => transaction.card_id === cardId
      );
      const newCardAmount = remainingTransactions.reduce(
        (total, transaction) =>
          transaction.type === "Income"
            ? total + transaction.amount
            : total - transaction.amount,
        0
      );

      // Update the card's amount in the database and local state
      await updateCard(cardId, { amount: newCardAmount });

      console.log("Transaction removed successfully");
      getData(); // Refresh data after removing transaction
    } catch (error) {
      console.error("Error removing transaction: ", error);
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    try {
      // Calculate the new card amount based on transaction type
      const currentCard = cards.find((card) => card.id === transaction.card_id);
      if (!currentCard) {
        throw new Error(`Card with id ${transaction.card_id} not found.`);
      }

      let newCardAmount = currentCard.amount;
      if (transaction.type === "Income") {
        newCardAmount += transaction.amount;
      } else if (transaction.type === "Expense") {
        newCardAmount -= transaction.amount;
      }

      // Update the card's amount
      await updateCard(transaction.card_id, { amount: newCardAmount });

      // Insert the transaction into the database
      await db.runAsync(
        `INSERT INTO Transactions (category_id, amount, date, description, type, card_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          transaction.category_id,
          transaction.amount,
          transaction.date,
          transaction.description,
          transaction.type,
          transaction.card_id,
        ]
      );

      console.log("Transaction added successfully");
      // After adding, update local state or fetch data again
      getData();
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "short" });
  };

  const formatMonthlyTransactions = (
    data: { month: string; total: number }[]
  ) => {
    const colors = ["#3E6990", "#06070E"];
    return data.map((item, index) => ({
      id: (index + 1).toString(),
      height: item.total,
      color: colors[index % colors.length],
      month: getMonthName(parseInt(item.month.split("-")[1])),
    }));
  };

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
      setMonthlyExpenses(transactionsByMonth[0]);

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

      const monthlyTransactionsResult = await db.getAllAsync<{
        month: string;
        total: number;
      }>(
        `SELECT strftime('%Y-%m', datetime(date, 'unixepoch')) as month, 
                SUM(amount) as total 
         FROM Transactions 
         GROUP BY month 
         ORDER BY month DESC;`
      );
      setMonthlyTransactions(
        formatMonthlyTransactions(monthlyTransactionsResult)
      );
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
        addTransaction,
        removeTransaction,
        monthlyExpenses,
        monthlyTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactionsContext must be used within a TransactionsProvider"
    );
  }
  return context;
};
