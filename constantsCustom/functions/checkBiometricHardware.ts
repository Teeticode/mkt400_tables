import * as LocalAuthentication from "expo-local-authentication";
import { setDeviceBiometricsDetails } from "../../redux/features/authSlice";
import userStore from "../../stores/user.store";

export default async function checkBiometricHardware() {
  const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
  if (isBiometricAvailable) {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const biometricTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (isEnrolled) {
      userStore.getState().setBiometricsDetails({
        isBiometricAvailable: true,
        biometricType: biometricTypes[0] == 2 ? "Face ID" : "Touch ID",
      });
      // dispatch(
      //   setDeviceBiometricsDetails({
      //     isBiometricAvailable: true,
      //     biometricType: biometricTypes[0],
      //   })
      // );
    }
  }
}
