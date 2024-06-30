import CardBackground from "@/assets/images/CardBackground";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import tw from "twrnc";

interface Props {
  color: string;
  amountBgColor: string;
}

const CreditCard = ({ color, amountBgColor }: Props) => {
  const cardNumber = "**** **** **** 5432";
  const amount = "$123.45";

  return (
    <View style={styles.container}>
      <View style={[tw`${color} p-10`, styles.card]}>
        <View style={styles.background}>
          <CardBackground />
        </View>
        <View style={tw`flex flex-col gap-8`}>
          <View style={tw`gap-2`}>
            <Text style={tw`text-zinc-400 text-xs font-semibold`}>
              Total balance
            </Text>
            <Text style={tw`text-3xl text-zinc-100 font-bold`}>{amount}</Text>
          </View>
          <Text style={tw`text-zinc-400 font-semibold`}>{cardNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {},
  card: {
    width: 295,
    height: 175,
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolderLabel: {
    color: "#fff",
    fontSize: 10,
  },
  cardHolder: {
    color: "#fff",
    fontSize: 16,
  },
  expiryDateLabel: {
    color: "#fff",
    fontSize: 10,
  },
  expiryDate: {
    color: "#fff",
    fontSize: 16,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountLabel: {
    color: "#fff",
    fontSize: 12,
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "semibold",
  },
});