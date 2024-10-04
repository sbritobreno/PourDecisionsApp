import { Tabs } from "expo-router";
import Header from "../components/Header";

const TabsLayout = () => {
  return (
    <>
      <Header />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="recipeDetails"
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
