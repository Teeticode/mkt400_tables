import * as SecureStore from "expo-secure-store";

export default async function storeUserDetails(
  phone: string,
  password: string
) {
  await SecureStore.setItemAsync(
    "userInfo",
    JSON.stringify({
      phone,
      password,
    })
  );
}
