import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreditCard from "@/components/credit-card/CreditCard";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import tw from "twrnc";
import { Link } from "expo-router";
import FloatingTransactionButton from "@/components/buttons/FloatingTransactionButton";
import TransactionsList from "@/components/transactions-list/TransactionsList";
import { useCardContext } from "@/context/CardContext";

type Props = {};

const Accounts = (props: Props) => {
  const insets = useSafeAreaInsets();

  const { cards, removeCard } = useCardContext();

  const [selected_option, setSelectedOption] = useState({
    name: "Accounts",
    location: "accounts",
  });
  const nav_tabs = [
    { name: "Accounts", location: "accounts" },
    { name: "Statement", location: "statement" },
  ];

  // Function to generate background color based on index
  const getBackgroundColor = (index: number) => {
    const colors = ["bg-[#363946]", "bg-zinc-950", "bg-blue-900", "bg-red-900"]; // Example colors
    return colors[index % colors.length]; // Cycle through colors based on index
  };

  return (
    <View style={tw`h-full bg-white relative items-center justify-center`}>
      <FloatingTransactionButton />
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

        {cards?.length < 1 && (
          <View>
            <Text style={tw`text-center text-lg font-bold text-zinc-950`}>
              No cards found
            </Text>
            <Text style={tw`text-center text-sm font-medium text-zinc-400`}>
              Click below to add a card and start saving
            </Text>
          </View>
        )}

        <View>
          <FlatList
            data={cards} // Use cards data from context
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={(item) => item.id.toString()} // Ensure each card has a unique id
            renderItem={({ item, index }) => (
              <CreditCard
                color={getBackgroundColor(index)} // Dynamically set background color based on index
                name={item.name} // Example name, modify based on item data
                cardNumber={item.number} // Example number, modify based on item data
                amount={item.amount} // Example amount, modify based on item data
                id={item.id} // Example id, modify based on item data
                removeCard={removeCard}
              />
            )}
            contentContainerStyle={tw`gap-4`}
          />
        </View>

        <Pressable
          style={[
            tw` w-full rounded-full`,
            { backgroundColor: Colors.dark.background },
          ]}
        >
          <Link href={"/add-account"} asChild>
            <Text style={tw`text-white text-center p-3 `}>Add Card</Text>
          </Link>
        </Pressable>
      </View>
      <ScrollView
        style={tw`bg-zinc-50 border-t border-zinc-200/50 flex-1 w-full z-0 p-4 mb-8`}
      >
        <TransactionsList />
      </ScrollView>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
