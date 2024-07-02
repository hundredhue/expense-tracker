import { useTransactionsContext } from "@/context/TransactionContext";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useCardContext } from "@/context/CardContext";
import { Cards, Category } from "@/utils/types";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { data } from "@/utils/data";

type Props = {};

const TransactionModal = (props: Props) => {
  const [selected_option, setSelectedOption] = useState(
    data.transaction_types[0]
  );
  const { cards } = useCardContext();
  const { categories, addTransaction } = useTransactionsContext();
  const [selected_category, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [selected_card, setSelectedCard] = useState<Cards | null>(null);
  const [transactionName, setTransactionName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addTransactionHandler = () => {
    // Validate input fields before proceeding
    if (!selected_card || !transactionName || !amount) {
      alert("Please fill in all fields");
      return;
    }

    // Prepare transaction object
    const newTransaction = {
      category_id: selected_category?.id, // Assuming selected_option has _id
      amount: parseFloat(amount),
      date: Math.floor(Date.now() / 1000), // Use appropriate date format as per your requirements
      description,
      type: selected_option._id,
      card_id: selected_card.id,
    };

    // @ts-ignore
    addTransaction(newTransaction);
    setTransactionName("");
    setDescription("");
    setAmount("");
  };

  const addNewCard = () => {
    // Implement logic to add a new card
    // For example, show a modal to input new card details and call addCard function
    // addCard(newCardName, newCardNumber, newCardType);
    console.log("Adding new card...");
  };

  const filterCategoriesByType = (type: string) => {
    return categories.filter(
      (category) => category.type.toLowerCase() === type.toLowerCase()
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-50`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`p-4 gap-4`}>
          <View style={tw`flex flex-col`}>
            <Text style={tw`p-2 text-zinc-950 font-bold`}>
              Transaction Type
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              {data.transaction_types.map((item) => (
                <Pressable
                  key={item._id}
                  onPress={() => setSelectedOption(item)}
                  style={[
                    tw`${
                      selected_option._id === item._id
                        ? "bg-[#819595] border border-[#363946]"
                        : "bg-white border border-zinc-200/50"
                    } py-2 rounded-full px-4`,
                  ]}
                >
                  <Text style={tw`text-[#363946] font-semibold`}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={tw`flex flex-col`}>
            <Text style={tw`p-2 text-zinc-950 font-bold`}>Select Card</Text>
            <View style={tw`flex-row items-center gap-2 flex-wrap`}>
              <Pressable
                onPress={addNewCard}
                style={tw`bg-white border items-center gap-2 flex-row items-center border-zinc-200/50 py-2 rounded-full px-4`}
              >
                <AntDesign name="plus" size={20} color="#3f3f46" />
                <Text style={tw`text-[#363946] font-semibold`}>Add Card</Text>
              </Pressable>
              {cards.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedCard(item)}
                  style={[
                    tw`${
                      selected_card?.id === item.id
                        ? "bg-[#819595] border border-[#363946]"
                        : "bg-white border border-zinc-200/50"
                    } py-2 rounded-full px-4`,
                  ]}
                >
                  <Text style={tw`text-[#363946] font-semibold`}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={tw`flex flex-col`}>
            <Text style={tw`p-2 text-zinc-950 font-bold`}>Select Category</Text>
            <View style={tw`flex-row items-center gap-2 flex-wrap`}>
              <Pressable
                onPress={addNewCard}
                style={tw`bg-white border items-center gap-2 flex-row items-center border-zinc-200/50 py-2 rounded-full px-4`}
              >
                <AntDesign name="plus" size={20} color="#3f3f46" />
                <Text style={tw`text-[#363946] font-semibold`}>
                  Add Category
                </Text>
              </Pressable>
              {filterCategoriesByType(selected_option._id).map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedCategory(item)}
                  style={[
                    tw`${
                      selected_category?.id === item.id
                        ? "bg-[#819595] border border-[#363946]"
                        : "bg-white border border-zinc-200/50"
                    } py-2 rounded-full px-4`,
                  ]}
                >
                  <Text style={tw`text-[#363946] font-semibold`}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={tw`flex flex-col gap-2`}>
            <Text style={tw` text-zinc-950 px-2 font-bold`}>Other Info</Text>
            <TextInput
              value={transactionName}
              onChangeText={setTransactionName}
              style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl`}
              placeholder="Transaction name"
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl`}
              placeholder="Description"
            />
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl`}
              placeholder="Amount"
              keyboardType="numeric"
            />
          </View>
          <PrimaryButton
            text={"Add Transaction"}
            onPress={addTransactionHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({});
