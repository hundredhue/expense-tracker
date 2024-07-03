import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useRef, useEffect, useMemo } from "react";
import tw from "twrnc";
import { useTransactionsContext } from "@/context/TransactionContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BAR_WIDTH = 12; // width for each bar
const BAR_SPACING = 4; // spacing between bars
const ITEM_HEIGHT = 10; // assumed height for each item in FlatList

const RoundedBarGraphs = () => {
  const flatListRef = useRef<FlatList | null>(null);
  const { monthlyTransactions } = useTransactionsContext();

  // Calculate the maximum value among monthlyTransactions
  const maxTransaction = useMemo(() => {
    if (monthlyTransactions.length === 0) return 0;
    return Math.max(...monthlyTransactions.map((item) => item.height));
  }, [monthlyTransactions]);

  // Adjust each transaction's height as a percentage of the maximum value
  const adjustedTransactions = useMemo(() => {
    if (maxTransaction === 0) return monthlyTransactions;
    return monthlyTransactions.map((item) => ({
      ...item,
      adjustedHeight: (item.height / maxTransaction) * 25,
    }));
  }, [monthlyTransactions, maxTransaction]);

  // Calculate initial scroll index based on the current month (0-indexed)
  const initialScrollIndex = useMemo(() => {
    return Math.min(new Date().getMonth(), adjustedTransactions.length - 1);
  }, [adjustedTransactions.length]);

  useEffect(() => {
    // Scroll to the middle item on initial render, if the data is available
    if (flatListRef.current && adjustedTransactions.length > 0) {
      try {
        flatListRef.current.scrollToIndex({
          animated: false,
          index: initialScrollIndex,
          viewOffset: screenWidth / 2 - BAR_WIDTH / 2,
        });
      } catch (error) {
        console.error("scrollToIndex error:", error);
      }
    }
  }, [initialScrollIndex, adjustedTransactions.length]);

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof adjustedTransactions)[0];
    index: number;
  }) => (
    <View style={tw`items-center`}>
      <View
        style={[
          tw`w-${BAR_WIDTH} rounded-lg`,
          {
            height: (item?.adjustedHeight / 100) * screenHeight,
            backgroundColor:
              index === initialScrollIndex ? "#29524A" : item.color,
          },
        ]}
      />
      <Text style={tw`mt-2 text-xs font-semibold text-zinc-500`}>
        {item.month}
      </Text>
    </View>
  );

  return (
    <View style={tw`flex-1 justify-center items-center h-full`}>
      <FlatList
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        horizontal
        data={adjustedTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`items-end`}
        ItemSeparatorComponent={() => <View style={{ width: BAR_SPACING }} />}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        style={tw`h-full w-full`}
        initialScrollIndex={initialScrollIndex}
      />
    </View>
  );
};

export default RoundedBarGraphs;

const styles = StyleSheet.create({});
