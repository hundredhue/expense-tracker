import React, { ReactNode } from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import HomeFilled from "@/assets/icons/HomeFilled";
import HomeOutline from "@/assets/icons/HomeOutline";
import CardOutline from "@/assets/icons/CardOutline";
import CardFilled from "@/assets/icons/CardFilled";
import UserFilled from "@/assets/icons/UserFilled";
import UserOutline from "@/assets/icons/UserOutline";
import AnalyticsFilled from "@/assets/icons/AnalyticsFilled";
import AnalyticsOutline from "@/assets/icons/AnalyticsOutline";

interface IconProps {
  children?: ReactNode;
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({ children }: IconProps) {
  return children;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let imageName;

          switch (route.name) {
            case "index":
              imageName = focused ? <HomeFilled /> : <HomeOutline />;
              break;
            case "accounts":
              imageName = focused ? <CardFilled /> : <CardOutline />;
              break;
            case "analytics":
              imageName = focused ? <AnalyticsFilled /> : <AnalyticsOutline />;
              break;
            case "overview":
              imageName = focused ? <UserFilled /> : <UserOutline />;
              break;
            default:
              // Default icon if route name doesn't match any case
              imageName = <HomeFilled />;
              break;
          }

          // Return your custom TabBarIcon component
          return <TabBarIcon children={imageName} />;
        },
        tabBarActiveTintColor: "#155e75",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 13,
        },
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingVertical: Platform.OS === "ios" ? 15 : 0,
          position: "absolute",
          bottom: 15,
          left: 10,
          right: 10,
          borderRadius: 50,
          backgroundColor: "#4A4D59",
          elevation: 0,
          borderTopWidth: 0,
          borderColor: "#4A4D59",
        },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="accounts" />
      <Tabs.Screen name="analytics" />

      {/* Add more screens as needed */}
    </Tabs>
  );
}
