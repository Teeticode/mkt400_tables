import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, {
  ReactNode,
  Ref,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { animateLayout } from "../../utils/animation.utils";
import * as Device from "expo-device";
import { createNumberArray } from "../../utils/array.utils";
import {
  formatDateWithoutDay,
  getDaysInMonth,
  getYear18YearsAgo,
  getYearYearsAgo,
  monthsWithNames,
} from "../../utils/date.utils";
import Box, { BoxProps } from "./Box-1";
import MainButton, { MainButtonProps, ThemedIconButton } from "./MainButton";
import MainModal from "./MainModal";
import MainText, { MainTextProps } from "./MainText";
import Colors from "../../constants/Colors";
import { ScreenHeight, ScreenWidth, color } from "@rneui/base";
import { FlatList } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters";
import { AnimateOnAppear } from "./Box";
import { MYfonts } from "../Typography/Fonts";

export default function MainTextInput({
  wrapper,
  errorMessage,
  errors,
  leftSlot,
  leftSlotProps,
  rightSlot,
  rightSlotProps,
  dense,
  label,
  labelProps,
  ref,
  size = "md",
  borderColor = "rgba(255,255,255,0)",
  ...input
}: MainTextInputProps) {
  const sizeStyles = getTextStyles(size);
  const [inputFocused, setInputFocused] = useState(false);
  const hasValue = input?.value && input?.value.toString().trim() !== "";

  return (
    <>
      <>
        <Box
          justify="center"
          radius={10}
          height={50}
          borderWidth={1}
          borderColor={Colors.theme.light}
          color={
            inputFocused && !hasValue ? Colors.theme.light : Colors.theme.light
          }
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
      </>
    </>
  );
}

export function MainEmailInput(props: MainTextInputProps) {
  return (
    <MainTextInput
      placeholder="Email"
      keyboardType="email-address"
      rightSlot={<Feather name="mail" size={18} color={Colors.theme.text} />}
      {...props}
    />
  );
}

export function MainPasswordInput(props: MainTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainTextInput
      placeholder="Password"
      {...props}
      secureTextEntry={!showPassword}
      rightSlot={
        <Pressable onPress={() => setShowPassword((value) => !value)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={Colors.theme.text}
          />
        </Pressable>
      }
    />
  );
}

export function MainSearchInput(props: MainSearchInputProps) {
  const [value, setValue] = useState(props.value || "");

  return (
    <MainTextInput
      placeholder="Search"
      value={value}
      {...props}
      onChangeText={(value) => {
        setValue(value);
        if (props.onChangeText) props.onChangeText(value);
      }}
      rightSlot={
        <ThemedIconButton
          icon={{ name: "x" }}
          onPress={() => {
            setValue("");
            if (props.clear) props.clear();
          }}
        />
      }
    />
  );
}

export function MainDateInput(props: MainDateInputProps) {
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={props?.pressableStyle}
        onPress={() => setShowDatePicker(true)}
      >
        <MainTextInput
          placeholder="Date"
          value={date}
          {...props}
          wrapper={{ viewProps: { pointerEvents: "none" }, ...props.wrapper }}
          rightSlot={
            <Box width={"100%"} height={"100%"} align="center" justify="center">
              <Feather name={"calendar"} size={20} color={Colors.theme.text} />
            </Box>
          }
        />
      </TouchableOpacity>

      <DatePickerModal
        visible={showDatePicker}
        close={() => setShowDatePicker(false)}
        onSelect={(value) => {
          if (props.onInput) props.onInput(value);
          setDate(formatDateWithoutDay(value));
          setShowDatePicker(false);
        }}
      />
    </>
  );
}

export function DatePickerModal({
  onSelect,
  close,
  visible,
}: {
  onSelect: (value: Date) => void;
  close: () => void;
  visible: boolean;
}) {
  const maxYear = getYearYearsAgo(-2);
  const minimumYear = getYearYearsAgo(2);
  const [year, setYear] = useState(minimumYear);

  const [month, setMonth] = useState<(typeof monthsWithNames)[0] | null>(null);

  const [day, setDay] = useState<number | null>(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const translateYInterpolated = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [ScreenHeight - 100, 0], // Translate along the Y-axis by 100 units
  });

  const animate = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate();
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(1);
  const [totalWidth, setTotalWidth] = useState(ScreenWidth);

  const scrollNext = () => {
    setStep((curr) => curr + 1);
  };
  const scrollPrev = () => {
    setStep((curr) => curr - 1);
  };

  return (
    <MainModal
      visible={visible}
      transparent
      onRequestClose={close}
      position="bottom"
    >
      <Box height={ScreenHeight - 100} block>
        {year && (
          <Box block align="center" py={10}>
            <MainButton
              icon={{
                name: step === 1 ? "calendar" : "chevron-left",
                gap: 1,
              }}
              label={`${day || ""} ${month?.name || ""} ${year || ""}`}
              wrapperProps={{ justify: "space-between" }}
              onPress={() => scrollPrev()}
              disabled={step === 1 ? true : false}
              size="sm"
            />
          </Box>
        )}
        <Box block flex={1}>
          {step === 1 && (
            <ScrollView
              style={{ maxWidth: ScreenWidth - 40 }}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 10,
              }}
            >
              {/* TODO: Allow Mni and Max Adjustment */}
              {createNumberArray(minimumYear, maxYear)
                .sort((a, b) => b - a)
                .map((_year) => (
                  <MainButton
                    key={_year}
                    label={_year}
                    type={year === _year ? "secondary" : "secondary-outlined"}
                    onPress={() => {
                      animateLayout();
                      setYear(_year);
                      scrollNext();
                    }}
                    size="xs"
                  />
                ))}
            </ScrollView>
          )}

          {step === 2 && (
            <Box
              direction="row"
              px={10}
              gap={20}
              justify="space-between"
              wrap="wrap"
              width={ScreenWidth - 20}
            >
              {year && (
                <>
                  {monthsWithNames.map((_month) => (
                    <MainButton
                      key={_month?.month}
                      label={_month.name}
                      color={
                        month?.name === _month.name
                          ? Colors.theme.primaryOrange
                          : undefined
                      }
                      type={
                        month?.name === _month.name
                          ? "secondary"
                          : "secondary-outlined"
                      }
                      size="xs"
                      width={80}
                      onPress={() => {
                        animateLayout();
                        setMonth(_month);
                        scrollNext();
                      }}
                    />
                  ))}
                </>
              )}
            </Box>
          )}

          {step === 3 && (
            <Box
              direction="row"
              gap={20}
              wrap="wrap"
              justify="flex-start"
              width={ScreenWidth - 20}
            >
              {year && month && (
                <>
                  {getDaysInMonth(year, month.month).map((_day) => (
                    <MainButton
                      key={_day}
                      label={_day}
                      type={day === _day ? "secondary" : "secondary-outlined"}
                      size="xs"
                      width={70}
                      onPress={() => {
                        animateLayout();
                        setDay(_day);
                      }}
                    />
                  ))}
                </>
              )}
            </Box>
          )}
          {year && month && day && (
            <Box pa={20}>
              <MainButton
                label={"Don"}
                block
                type="primary"
                onPress={() => {
                  let dateObj = new Date(year, month.month, day);
                  onSelect(dateObj);
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </MainModal>
  );
}

export function MainSelectInput<T extends Obj[]>(props: MainSelectProps<T>) {
  const [selectedOption, setSelectedOption] = useState<Record<string, any>>(
    props.selected as any
  );
  const [showOptionPicker, setShowOptionPicker] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState<T[number][]>(
    props.options
  );

  function filterOptions(query: string) {
    const found = props.options.filter((option) =>
      option[props.labelProperty]
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredOptions(found);
  }

  return (
    <>
      <TouchableOpacity onPress={() => setShowOptionPicker(true)}>
        <MainTextInput
          placeholder="Select"
          value={
            selectedOption ? selectedOption[props.labelProperty].toString() : ""
          }
          {...props}
          wrapper={{ viewProps: { pointerEvents: "none" }, ...props.wrapper }}
          rightSlot={
            <ThemedIconButton
              icon={{ name: "chevron-down" }}
              onPress={() => setShowOptionPicker(true)}
            />
          }
        />
      </TouchableOpacity>

      <MainModal
        position="bottom"
        visible={showOptionPicker}
        containerProps={{
          height: Math.min(props.options.length * 80, ScreenHeight - 100),
        }}
        onRequestClose={() => setShowOptionPicker(false)}
      >
        {props.enableSearch && (
          <MainTextInput
            placeholder="Search"
            leftSlot={
              <Feather name="search" size={16} color={Colors.theme.text} />
            }
            onChangeText={(value) => {
              filterOptions(value);
            }}
          />
        )}
        <FlashList
          estimatedItemSize={100}
          data={filteredOptions}
          renderItem={({ item: option }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (props.onInput) props.onInput(option);
                  setSelectedOption(option);
                  setShowOptionPicker(false);
                }}
              >
                <Box
                  key={option[props.labelProperty]}
                  direction="row"
                  block
                  pa={20}
                  gap={10}
                >
                  <MainText>{option[props.labelProperty]}</MainText>
                </Box>
              </TouchableOpacity>
            );
          }}
        />
      </MainModal>
    </>
  );
}
export function MainOptionsPicker<T extends Obj[]>(
  props: MainOptionsPickerProps<T>
) {
  const [selectedOption, setSelectedOption] = useState<
    Record<string, any> | null | undefined
  >(props.selected as any);
  const [showOptionPicker, setShowOptionPicker] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState<T[number][]>(
    props.options
  );

  function filterOptions(query: string) {
    const found = props.options.filter((option) =>
      option[props.labelProperty]
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredOptions(found);
  }

  useEffect(() => {
    setSelectedOption(props.selected);
    filterOptions("");
  }, [props.selected]);
  useEffect(() => {
    filterOptions("");
  }, [props.options]);

  useEffect(() => {
    console.log(Device.platformApiLevel);
  }, []);

  return (
    <>
      {props.requiresButton && (
        <MainButton
          {...props}
          label={
            selectedOption
              ? selectedOption[props.labelProperty].toString()
              : props.label
              ? props.label
              : "Select"
          }
          icon={{ name: "chevron-down", position: "append" }}
          onPress={() => setShowOptionPicker(true)}
          type={selectedOption ? "secondary" : "surface"}
        />
      )}

      <MainModal
        position="bottom"
        backDropClose={() => {
          if (props.requiresButton) setShowOptionPicker(false);
          else props?.onCloseProvided?.();
          console.log("j;l");
        }}
        visible={props.openProvided ? props.openProvided : showOptionPicker}
        containerProps={{
          height: Math.min(props.options.length * 50, ScreenHeight - 100),
          radiusTop: 20,
          pa: 10,
        }}
        onRequestClose={() => {
          if (props.requiresButton) setShowOptionPicker(false);
          else props?.onCloseProvided?.();
        }}
        title={`Select ${props.label}`}
      >
        {props.enableSearch && (
          <MainTextInput
            placeholder="Search"
            leftSlot={
              <Feather name="search" size={16} color={Colors.theme.text} />
            }
            onChangeText={(value) => {
              filterOptions(value);
            }}
          />
        )}
        <FlatList
          data={filteredOptions}
          renderItem={({ item: option }) => {
            return (
              <Box align="flex-start" key={option[props.labelProperty]} block>
                <MainButton
                  label={option[props.labelProperty]}
                  type={selectedOption === option ? "secondary" : "text"}
                  size="sm"
                  onPress={() => {
                    if (props.onInput) props.onInput(option);
                    setSelectedOption(option);
                    setShowOptionPicker(false);
                    props.onCloseProvided?.();
                  }}
                  width={"100%"}
                  wrapperProps={{ justify: "flex-start" }}
                  radius={15}
                />
              </Box>
            );
          }}
        />
      </MainModal>
    </>
  );
}

type _BoxProps = Omit<BoxProps, "children">;

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
}

interface MainPhoneNumberInputProps extends MainTextInputProps {
  onInput?: (value: string) => void;
  selectedPhone?: {
    phoneCode: string;
    cellphone: string;
  };
}

interface MainSearchInputProps extends MainTextInputProps {
  onInput?: (value: string) => void;
  clear?: () => void;
}

interface MainDateInputProps extends MainTextInputProps {
  onInput?: (value: Date) => void;
  pressableStyle?: ViewStyle;
}

type Obj = { [key: string]: any }; // Define a general object type

type KeysUnion<T extends Obj[]> = T extends Array<infer U> ? keyof U : never; // Extract keys union from array of objects

interface MainSelectProps<T extends Obj[]> extends MainTextInputProps {
  options: T;
  labelProperty: KeysUnion<T>;
  enableSearch?: boolean;
  selected?: T[number];
  onInput?: (selectedOption: T[number]) => void;
}

interface MainOptionsPickerProps<T extends Obj[]> extends MainButtonProps {
  openProvided?: boolean;
  onCloseProvided?: () => void;
  options: T;
  labelProperty: KeysUnion<T>;
  enableSearch?: boolean;
  requiresButton?: boolean;
  selected?: T[number] | null;
  onInput?: (selectedOption: T[number]) => void;
}

// interface MainSelectProps extends Props<T> {
// 	onInput: (value: Record<string, any>) => void;
// 	options: Record<string, any>[];
// 	labelProperty: string;
// 	enableSearch?: boolean;
// 	selected?: Record<string, any>;
// }

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

interface InputStyles {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
}

const textSizes = [
  { size: "xxxs", value: 8 },
  { size: "xxs", value: 10 },
  { size: "xs", value: 12 },
  { size: "sm", value: 14 },
  { size: "md", value: 16 },
  { size: "lg", value: 18 },
  { size: "xl", value: 20 },
  { size: "xxl", value: 24 },
  { size: "xxxl", value: 28 },
];

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
