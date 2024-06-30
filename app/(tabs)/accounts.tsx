import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreditCard from "@/components/credit-card/CreditCard";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import tw from "twrnc";
import CashFlowItem from "@/components/CashFlowItem/CashFlowItem";

type Props = {};

const Accounts = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [selected_option, setSelectedOption] = useState({
    name: "Accounts",
    location: "accounts",
  });
  const [accounts, setAccounts] = useState([1]);
  const nav_tabs = [
    { name: "Accounts", location: "accounts" },
    { name: "Statement", location: "statement" },
  ];

  const cardColors = [
    { color: "bg-[#363946]", amountBgColor: "bg-blue-900" },
    { color: "bg-zinc-950", amountBgColor: "bg-zinc-700" },
    { color: "bg-blue-900", amountBgColor: "bg-yellow-900" },
    { color: "bg-red-900", amountBgColor: "bg-red-900" },
  ];

  const cash_flow = [
    {
      name: "Amazon",
      description: "shopping",
      amount: 1672.5,
      type: "expense",
    },
    { name: "Derreck", description: "received", amount: 50.0, type: "income" },
    {
      name: "Travelling",
      description: "chi-hr",
      amount: 10.0,
      type: "expense",
    },
  ];

  return (
    <View style={tw`h-full bg-white relative items-center justify-center`}>
      <View
        style={[
          tw`absolute bottom-25 right-3 p-4 rounded-full z-50`,
          { backgroundColor: Colors.dark.background },
        ]}
      >
        <AntDesign name="plus" size={24} color="white" />
      </View>
      {/* {accounts.length >= 1 ? ( */}
      <View
        style={[
          tw`gap-8 w-full px-4 py-8`,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={tw`flex flex-row pt-4`}>
          <View
            style={tw`flex flex-row items-center bg-zinc-100 p-1 rounded-full`}
          >
            {nav_tabs.map((item) => (
              <TouchableOpacity
                onPress={() => setSelectedOption(item)}
                style={tw`${
                  selected_option.location === item.location ? "bg-white " : " "
                } py-2 rounded-full px-4 `}
                key={item.name}
              >
                <Text
                  style={tw`${
                    selected_option.location === item.location
                      ? "text-zinc-950 "
                      : "text-zinc-500 "
                  } font-semibold`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Cards */}
        </View>

        <View>
          <FlatList
            data={cardColors} // Use cardColors as data
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CreditCard
                color={item.color}
                amountBgColor={item.amountBgColor}
              />
            )} // Pass color prop
            contentContainerStyle={tw`gap-4`}
          />
        </View>

        <TouchableOpacity
          style={[
            tw` w-full p-3 rounded-full`,
            { backgroundColor: Colors.dark.background },
          ]}
        >
          <Text style={tw`text-white text-center`}>Add Card</Text>
        </TouchableOpacity>
      </View>
      <View
        style={tw`bg-zinc-50 border-t border-zinc-200/50 flex-1 w-full z-0 p-4`}
      >
        <View
          style={tw`bg-white rounded-3xl flex-1 border border-zinc-200/50 p-2`}
        >
          {/* Money Item */}
          {cash_flow.map((item, index) => (
            <CashFlowItem
              key={index}
              name={item.name}
              description={item.description}
              amount={item.amount}
              type={item.type}
            />
          ))}
        </View>
      </View>
      {/* ) : (
        <>
          <Text style={tw`text-zinc-950 text-2xl font-bold`}>
            No accounts available
          </Text>
          <Text style={tw`text-zinc-400 font-medium`}>
            Add an account to display it here
          </Text>
        </>
      )} */}
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({});
