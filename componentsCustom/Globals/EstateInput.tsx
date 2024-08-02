import { forwardRef, ReactNode, RefObject, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Box, { AnimateOnAppear, BoxProps } from "./Box";
import MainText, { MainTextProps } from "./MainText";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Colors from "@/constants/Colors";
import { MYfonts } from "../Typography/Fonts";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "../Themed";

interface InputStyles {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
}
const getTextStyles = (size: InputSize): InputStyles => {
  let styles: InputStyles = {
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
  };

  switch (size) {
    case "xxxs":
      styles = {
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 6,
      };
      break;
    case "xxs":
      styles = {
        paddingVertical: 2,
        paddingHorizontal: 12,
        fontSize: 8,
      };
      break;
    case "xs":
      styles = {
        paddingVertical: 0,
        paddingHorizontal: 14,
        fontSize: 10,
      };
      break;
    case "sm":
      styles = {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 12,
      };
      break;
    case "md":
      styles = {
        paddingVertical: 14,
        paddingHorizontal: 18,
        fontSize: 14,
      };
      break;
    case "lg":
      styles = {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
      };
      break;
    case "xl":
      styles = {
        paddingVertical: 18,
        paddingHorizontal: 22,
        fontSize: 18,
      };
      break;
    case "xxl":
      styles = {
        paddingVertical: 20,
        paddingHorizontal: 24,
        fontSize: 20,
      };
      break;
    case "xxxl":
      styles = {
        paddingVertical: 22,
        paddingHorizontal: 26,
        fontSize: 22,
      };
      break;
    default:
      // Default values already set
      break;
  }

  return styles;
};
type _BoxProps = Omit<BoxProps, "children">;
type InputSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";
interface SlotProps extends _BoxProps {
  spacing?: number;
}
interface MainTextInputProps extends TextInputProps {
  wrapper?: Omit<BoxProps, "children">;
  errorMessage?: string | null | undefined;
  errors?: string[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  leftSlotProps?: SlotProps;
  rightSlotProps?: SlotProps;
  label?: string;
  labelProps?: MainTextProps;
  dense?: boolean;
  borderColor?: string;
  ref?: RefObject<TextInput>;
  size?: InputSize;
  active?: boolean;
}
const EstateInput = forwardRef<TextInput, MainTextInputProps>(
  (
    {
      wrapper,
      errorMessage,
      errors,
      leftSlot,
      active,
      leftSlotProps,
      rightSlot,
      rightSlotProps,
      dense,
      label,
      labelProps,
      size = "md",
      borderColor = "rgba(255,255,255,0)",
      ...input
    },
    ref
  ) => {
    const sizeStyles = getTextStyles(size);
    const [inputFocused, setInputFocused] = useState(false);
    const hasValue = input?.value && input?.value.toString().trim() !== "";

    return (
      <>
        <LinearGradient
          style={{
            height: verticalScale(53),
            width: "100%",
            borderRadius: moderateScale(13),
            alignItems: "center",
            justifyContent: "center",
          }}
          colors={[
            active ? Colors.theme.rentPrimary : "#FFFFFF",
            active ? Colors.theme.darkGreen : "#FFFFFF",
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View
            style={{
              borderRadius: 10,
              flex: 1,
              margin: 5,
              width: "99%",
              backgroundColor: "transparent",
              justifyContent: "center",
            }}
          >
            <Box
              justify="center"
              radius={10}
              height={verticalScale(50)}
              borderWidth={1}
              borderColor={Colors.theme.light}
              color={"#F5F4F8"}
              {...wrapper}
            >
              <AnimateOnAppear duration={700} visible={inputFocused}>
                {label && (
                  <MainText
                    mx={verticalScale(10)}
                    mt={verticalScale(5)}
                    size={"xxs"}
                    fontWeight="bold"
                    color={Colors.theme.primaryOrange}
                    {...labelProps}
                  >
                    {label}
                  </MainText>
                )}
              </AnimateOnAppear>
              <Box
                direction="row"
                borderColor={Colors.theme.stroke}
                justify="flex-start"
              >
                {leftSlot && (
                  <Box
                    pl={sizeStyles.paddingHorizontal / 2}
                    align="center"
                    justify="center"
                    {...leftSlotProps}
                  >
                    {leftSlot}
                  </Box>
                )}

                <TextInput
                  ref={ref}
                  style={{
                    flexGrow: 1,
                    paddingLeft: leftSlot
                      ? sizeStyles.paddingHorizontal / 4
                      : sizeStyles.paddingHorizontal,
                    paddingVertical: sizeStyles.paddingVertical,
                    fontFamily: MYfonts.Nunito_500Medium,
                    fontSize: sizeStyles.fontSize,
                    color: Colors.theme.text,
                    minWidth: input.placeholder?.length
                      ? input.placeholder.length * 10
                      : 100,
                    marginLeft: moderateScale(5),
                  }}
                  placeholderTextColor={"#A1A5C1"}
                  {...input}
                // onFocus={() => setInputFocused(true)}
                // onBlur={() => setInputFocused(false)}
                />
                {rightSlot && (
                  <Box
                    pr={sizeStyles.paddingHorizontal / 2}
                    align="center"
                    justify="center"
                    {...rightSlotProps}
                  >
                    {rightSlot}
                  </Box>
                )}
              </Box>
            </Box>

            {errorMessage && (
              <MainText color={Colors.theme.danger} size={12}>
                {errorMessage}
              </MainText>
            )}
            {errors && errorMessage?.length && (
              <Box block>
                {errors.map((err) => (
                  <MainText key={err} color={Colors.theme.danger} size={12}>
                    {err}
                  </MainText>
                ))}
              </Box>
            )}
          </View>
        </LinearGradient>
      </>
    );
  }
);

export default EstateInput;
