import { AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleProp,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import Colors from "../../constants/Colors";

type Props = {
  navigation?: () => void;
  style?: StyleProp<any>;
};
const BackButton = (props: Props) => {
  const { navigation, style } = props;
  return (
    <View style={[styles.btnWrapper, { ...style }]}>
      <TouchableOpacity onPress={navigation} style={styles.btn}>
        <AntDesign name="arrowleft" size={moderateScale(30)} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default BackButton;
const styles = StyleSheet.create({
  btn: {
    width: moderateScale(65.83),
    height: verticalScale(30.32),
    backgroundColor: Colors.theme.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(13.246),
    marginVertical: moderateScale(10),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    color: "#1E1E1E",
    fontFamily: "Roboto_400Regular",
    fontSize: moderateScale(18),
    marginLeft: "10%",
  },
  btnWrapper: {
    alignSelf: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
