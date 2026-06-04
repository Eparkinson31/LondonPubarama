import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#b03924",
        headerStyle: {
          backgroundColor: "#fffcf2",
        },
        headerShadowVisible: false,
        headerTintColor: "#b03924",
        tabBarStyle: {
          backgroundColor: "#fffcf2",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color="#6F6C43" size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" color="#6F6C43" size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color="#6F6C43" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
