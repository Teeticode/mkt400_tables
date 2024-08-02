import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { Overlay } from '@rneui/themed';
import Box from '@/componentsCustom/Globals/Box';
import MainText from '@/componentsCustom/Globals/MainText';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { MYfonts } from '@/componentsCustom/Typography/Fonts';
import { verticalScale } from 'react-native-size-matters';

type Props = {
    showOnboard: boolean
}

const Onboard = ({ showOnboard }: Props) => {
    const colorScheme = useColorScheme()
    return (
        <Overlay overlayStyle={{ backgroundColor: 'transparent', width: ScreenWidth, height: ScreenHeight, alignItems: "center", justifyContent: "center" }} isVisible={showOnboard}>
            {
                colorScheme === 'dark' ? (
                    <LottieView
                        style={{
                            width: "70%",
                            height: "70%",
                            alignItems: "center",

                        }}
                        source={require("../../assets/swipe_light.json")}
                        autoPlay
                        loop
                    />
                ) : (
                    <LottieView
                        style={{
                            width: "50%",
                            height: "50%",
                            alignItems: "center",

                        }}
                        source={require("../../assets/swipe2.json")}
                        autoPlay
                        loop
                    />
                )
            }
            {/* <Box mt={verticalScale(20)}>
                <MainText fontFamily={MYfonts.Nunito_800ExtraBold} color={'#4C1F00'} size={'xl'} align='center'>Swipe to view more columns columns</MainText>
            </Box> */}
        </Overlay>
    )
}

export default Onboard

const styles = StyleSheet.create({})