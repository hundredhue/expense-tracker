import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import CashFlowItem from "@/components/CashFlowItem/CashFlowItem";
import CreditCard from "@/assets/icons/CreditCard";
import tw from "twrnc";
import GoalReachedComponent from "@/components/goal-reached-component/GoalReachedComponent";
import FloatingTransactionButton from "@/components/buttons/FloatingTransactionButton";
import { useEffect, useState } from "react";
import { Category, Transaction, TransactionsByMonth } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite/next";
import { findFromArray } from "@/helpers/arrayMethods";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
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

  useEffect(() => {
    getData();
  }, [db]);

  async function getData() {
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
  }

  return (
    <View style={[tw`h-full gap-6 bg-zinc-50 relative`]}>
      <FloatingTransactionButton />
      <View
        style={[
          tw`min-h-[20%] bg-[#363946] items-center`,
          {
            paddingTop: insets.top,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
        ]}
      >
        <View style={tw`w-full py-12 px-8`}>
          <Text style={tw`text-xl text-white`}>Budget Friendly,</Text>
          <Text style={tw`text-xs text-white`}>
            What would you like to do today?
          </Text>
        </View>
        <View style={tw`flex-1`}></View>
        <View
          style={[
            tw`bg-[#5A6868] w-[75%] rounded-t-3xl h-5 overflow-hidden`,
            styles.centeredView,
          ]}
        ></View>
        <View
          style={[
            tw`bg-[#819595] w-[85%] rounded-t-3xl h-44 overflow-hidden`,
            styles.centeredView,
          ]}
        >
          <View style={tw`w-full`}>
            <View
              style={tw`bg-[#D9D9D9] top-0 absolute items-end p-4 right-0 h-32 w-40 rounded-bl-full `}
            >
              <View style={tw`h-12 w-12 `}>
                <CreditCard />
              </View>
            </View>
            <View style={tw`w-full h-full p-8 gap-4`}>
              <View style={tw`gap-0 flex-1`}>
                <Text style={tw`text-left text-xs text-white`}>Wallet</Text>
                <Text style={tw`text-left  text-xs text-white`}>Balance</Text>
              </View>
              <Text style={tw`text-3xl text-white font-semibold`}>
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={tw`px-4 gap-4 flex-1`}>
        <GoalReachedComponent />
        <View style={tw`flex flex-row justify-between pt-4 pb-2 px-2`}>
          <Text style={tw`text-lg font-bold text-zinc-950`}>Transactions</Text>
          <TouchableOpacity>
            <AntDesign name="arrowright" size={20} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
        <View
          style={tw`bg-white flex-1 p-2 gap-4 rounded-3xl border border-zinc-200/50 mb-20`}
        >
          {transactions.map((item, index) => (
            <CashFlowItem
              key={index}
              name={findFromArray(categories, item.category_id)?.name}
              description={item.description}
              amount={item.amount}
              type={item.type}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
