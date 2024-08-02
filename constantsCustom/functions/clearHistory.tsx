import { NavigationProp } from "@react-navigation/native";

export function clearHistory(
  navigation?: NavigationProp<ReactNavigation.RootParamList>
) {
  if (navigation) {
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
  }
}
