import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Text,
  ViewToken,
} from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import slides from "@/utils/slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import { useRouter } from "expo-router";

type Props = {};

const OnBoarding = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const scrollTo = () => {
    const nextIndex = currentIndex + 1;
    console.log(slides.length);
    if (nextIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      router.push("(tabs)");
    }
  };

  return (
    <View style={tw`h-full flex-1`}>
      <ImageBackground
        source={require("../../assets/images/intro-background.png")}
        style={[
          {
            flex: 1,
          },
        ]}
        resizeMode="cover"
      >
        <View style={tw`flex-2 gap-2`}>
          <FlatList
            data={slides}
            keyExtractor={(item) => item.id} // Ensure each item has a unique key
            pagingEnabled // Enables paging (swiping between screens)
            horizontal // Make the FlatList horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <OnBoardingItem scrollX={scrollX} item={item} />
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={viewableItemsChanged}
            scrollEventThrottle={32}
            ref={slidesRef}
          />
          <View style={tw`gap-4 p-4`}>
            <Paginator data={slides} scrollX={scrollX} />

            <TouchableOpacity
              onPress={scrollTo}
              style={tw`bg-white rounded-full text-zinc-950 p-3`}
            >
              <Text style={tw`text-center text-lg`}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
