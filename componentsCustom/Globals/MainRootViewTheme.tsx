import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import Box from "./Box";
import { ScreenHeight } from "@rneui/base";
import { moderateScale, verticalScale } from "react-native-size-matters";

type Props = {
  children: React.ReactNode;
};

const MainRootViewTheme = ({ children }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Box
      height={ScreenHeight}
      my={verticalScale(25)}
      color={colorScheme === "dark" ? "#000000" : "#ffffff"}
    >
      {children}
    </Box>
  );
};

export default MainRootViewTheme;

const styles = StyleSheet.create({});
