import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import GoalReachedComponent from "@/components/goal-reached-component/GoalReachedComponent";
import FloatingTransactionButton from "@/components/buttons/FloatingTransactionButton";
import TransactionsList from "@/components/transactions-list/TransactionsList";
import MobileHeroSection from "@/components/hero-section/MobileHeroSection";
import { useLimitsContext } from "@/context/LimitsContext";
import { useTransactionsContext } from "@/context/TransactionContext";

export default function TabOneScreen() {
  return (
    <View style={[tw`h-full gap-6 bg-zinc-50 relative`]}>
      <FloatingTransactionButton />
      <MobileHeroSection />
      <ScrollView style={tw`px-4 gap-4 flex-1`}>
        <GoalReachedComponent />
        <View style={tw`flex flex-row justify-between pt-4 pb-2 px-2`}>
          <Text style={tw`text-lg font-bold text-zinc-950`}>Transactions</Text>
          <TouchableOpacity>
            <AntDesign name="arrowright" size={20} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
        <TransactionsList />
      </ScrollView>
    </View>
  );
}
