import slides from "@/utils/slides";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import Paginator from "./Paginator";

type Props = {
  item: any;
  scrollX: any;
};

const OnBoardingItem = ({ item, scrollX }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[tw``, { width }]}>
      <View style={tw`flex-1`} />
      <View style={[tw`flex-col gap-4  p-4`]}>
        <Text style={tw`text-6xl text-white`}>{item.title}</Text>
        <Text style={tw`text-zinc-200`}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({});
