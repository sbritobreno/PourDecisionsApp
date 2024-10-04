import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import MainPage from "./screens/MainPage";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return <MainPage/>;
}
