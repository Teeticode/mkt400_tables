import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Box from "./Box";
import MainText from "./MainText";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { ScreenHeight, ScreenWidth } from "@rneui/base";

type Props = {
  trigger: any;
};

const Toast = ({ trigger }: Props) => {
  const [showToast, setShowToast] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowToast(true);
    }, 4000000);
  }, [trigger]);
  return (
    <Box position="relative">
      <Animated.View
        entering={SlideInUp}
        exiting={SlideInDown}
        style={{
          top: ScreenHeight - 100,
          position: "relative",
          left: ScreenWidth - 250,
          backgroundColor: "red",
          width: 200,
          display: showToast ? "flex" : "none",
        }}
      >
        <MainText>Hello</MainText>
      </Animated.View>
    </Box>
  );
};

export default Toast;

const styles = StyleSheet.create({});
