import { StyleSheet, Platform } from "react-native";
import React from "react";
import { Overlay } from "@rneui/themed";
import { DatePicker, Picker } from "react-native-wheel-pick";
import { scale } from "../../constantsCustom/Scaler";

type Props = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  field: string;
  onClose: () => void;
  isVisible: boolean;
  pickerData: string[];
  defaultValue: string;
  selectedValue: string;
  values?: any;
  date?: boolean;
  placeholder?: string;
};

const DropDownOverlayWheel = ({
  handleChange,
  field,
  onClose,
  isVisible,
  pickerData,
  selectedValue,
  placeholder,
  date,
  values,
}: Props) => {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={() => onClose()}>
      {!date ? (
        <Picker
          style={{
            backgroundColor: "white",
            width: scale(300),
            height: scale(215),
          }}
          selectedValue={selectedValue}
          pickerData={[`Choose ${field}`, ...pickerData]}
          onValueChange={(value: string) => {
            handleChange({
              target: {
                name: field,
                value: value,
              },
            });
          }}
        />
      ) : (
        <DatePicker
          style={{ height: scale(215), width: scale(300) }}
          date={
            new Date(
              values
                ? values[field].length > 0
                  ? values[field]
                  : "1999-07-27T00:00:00.000Z"
                : placeholder || "1999-07-27T00:00:00.000Z"
            )
          } // Optional prop - default is Today
          onDateChange={(date: string) => {
            handleChange({
              target: {
                name: "date",
                value: date,
              },
            });
          }}
        />
      )}
      {/* <CleanRow>
        <PayecardActionButton title="Confirm" onPress={() => onClose()} />
        <PayecardActionButton
          RevertedColor
          title="Cancel"
          onPress={() => {
            onClose();
            handleChange({
              target: {
                name: field,
                value: "",
              },
            });
          }}
        />
      </CleanRow> */}
    </Overlay>
  );
};

export default DropDownOverlayWheel;
