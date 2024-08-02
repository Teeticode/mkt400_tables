import { setItemAsync } from "expo-secure-store";

export default function saveUserDetailsInSecureStore(
  userDetails: LoginSuccessResponse["data"]
) {
  setItemAsync(
    "userDetails",
    JSON.stringify({ ...userDetails, inactive: false })
  );
}
