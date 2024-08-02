import { MessageType, showMessage } from "react-native-flash-message";
import { scale } from "../../constantsCustom/Scaler";
import Colors from "../../constantsCustom/Colors";

export const FlashMessage = (
  message: string,
  type: MessageType | undefined,
  description?: string | undefined
) =>
  showMessage({
    message: message,
    type: type,
    icon: type,
    description: description,
    duration: 3000,
    floating: true,
    position: "top",
    animated: true,
    style: {
      borderRadius: scale(20),
      marginTop: scale(50),
      padding: scale(10),
    },
    titleStyle: {
      color: Colors.dark.text,
      fontFamily: "Nunito_500Medium",
      marginHorizontal: scale(10),
    },
  });
