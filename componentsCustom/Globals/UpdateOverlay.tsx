import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Overlay } from "@rneui/themed";
import * as Application from "expo-application";

type Props = {};

const UpdateOverlay = (props: Props) => {
  return (
    <Overlay isVisible={false}>
      <Text>UpdateOverlay</Text>
    </Overlay>
  );
};

export default UpdateOverlay;
