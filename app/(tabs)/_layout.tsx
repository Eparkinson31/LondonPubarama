import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e2409f",
        headerStyle: {
          backgroundColor: "#e0ebff",
          //how to customize how the tabs and header including colors for active tab and header background//
        },
        headerShadowVisible: false,
        headerTintColor: "#e2409f",
        tabBarStyle: {
          backgroundColor: "#e0ebff",
        },
        // same as above but for header//
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              // name={focused ? "beer-sharp" : "beer-outline"} //
              name={"sparkles-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />{" "}
      // Defines home tab setting title, displaying an icon that changes colors
      based on whether the tab is active//
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={"heart-outline"} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
// Code creates two tabs home and about in the app and assign each one a title and an icon that changes color when tab is selected//
