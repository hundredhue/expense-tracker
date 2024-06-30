import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const data = [
  { id: "1", height: 20, color: "#3E6990", month: "Jan" },
  { id: "2", height: 40, color: "#06070E", month: "Feb" },
  { id: "3", height: 44, color: "#3E6990", month: "Mar" },
  { id: "4", height: 10, color: "#06070E", month: "Apr" },
  { id: "5", height: 40, color: "#3E6990", month: "May" },
  { id: "6", height: 60, color: "#06070E", month: "Jun" },
  { id: "7", height: 40, color: "#3E6990", month: "Jul" },
  { id: "8", height: 20, color: "#06070E", month: "Aug" },
  { id: "9", height: 20, color: "#3E6990", month: "Sep" },
  { id: "10", height: 40, color: "#06070E", month: "Oct" },
  { id: "11", height: 40, color: "#3E6990", month: "Nov" },
  { id: "12", height: 40, color: "#06070E", month: "Dec" },
];

const RoundedBarGraphs = () => {
  const flatListRef = useRef<FlatList | null>(null);

  // Calculate initial scroll index based on the current month (0-indexed)
  const initialScrollIndex = new Date().getMonth();

  useEffect(() => {
    // Scroll to the middle item on initial render
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: false,
        index: initialScrollIndex,
        viewOffset: screenWidth / 2 - 20, // Adjust offset to center the item
      });
    }
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: 60, // Assuming each item's height is 60 (adjust as per your actual design)
    offset: 60 * index,
    index,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof data)[0];
    index: number;
  }) => (
    <View style={tw`items-center`}>
      <View
        style={[
          tw`w-10 rounded-lg`,
          {
            height: (item.height / 300) * screenHeight,
            backgroundColor:
              index === initialScrollIndex ? "#29524A" : item.color,
          }, // Use different color for current month
        ]}
      />
      <Text style={tw`mt-2 text-xs font-semibold text-zinc-500`}>
        {item.month}
      </Text>
    </View>
  );

  return (
    <View style={tw`flex-1 justify-center items-center h-full`}>
      {/* Ensure parent container has height: '100%' to fill the screen */}
      <FlatList
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw` items-end`}
        ItemSeparatorComponent={() => <View style={tw`w-4`} />}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout} // Provide getItemLayout for proper scrolling
        style={tw`h-full w-full`} // Ensure FlatList fills the parent container's height and width
        initialScrollIndex={initialScrollIndex} // Ensure initialScrollIndex is set here
      />
    </View>
  );
};

export default RoundedBarGraphs;

const styles = StyleSheet.create({});
