import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useTransactionsContext } from "@/context/TransactionContext";
import CreditCard from "@/assets/icons/CreditCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const MobileHeroSection = (props: Props) => {
  const { totalIncome } = useTransactionsContext();
  const insets = useSafeAreaInsets();

  return (
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
              <Text style={tw`text-left text-sm text-white`}>Wallet</Text>
              <Text style={tw`text-left  text-sm text-white`}>Balance</Text>
            </View>
            <Text style={tw`text-3xl text-white font-semibold`}>
              ${totalIncome.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MobileHeroSection;

const styles = StyleSheet.create({
  centeredView: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
