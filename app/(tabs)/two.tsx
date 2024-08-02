import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import LottieView from 'lottie-react-native';
import MainText from '@/componentsCustom/Globals/MainText';
import Box from '@/componentsCustom/Globals/Box';
import { MYfonts } from '@/componentsCustom/Typography/Fonts';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: "70%",
          height: "70%",
          alignItems: "center",

        }}
        source={require("../../assets/notfound.json")}
        autoPlay
        loop
      />
      <Box align='center'>
        <MainText size={'sm'} fontFamily={MYfonts.Nunito_500Medium}>Click on a row to view more info</MainText>
        <MainText size={'sm'} fontFamily={MYfonts.Nunito_500Medium}>Swipe to view more columns</MainText>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
