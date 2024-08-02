import { View, Text } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Box from './Box';
import { Overlay } from '@rneui/themed';

import Lottie from 'lottie-react-native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { moderateScale } from 'react-native-size-matters';

interface Props {
    open: boolean,
    setOpen?: Dispatch<SetStateAction<boolean>>

}
const LoadingOverlay = ({ open, setOpen }: Props) => {
    return (
        <Overlay
            isVisible={open}
            onBackdropPress={() => {
                if (setOpen) {
                    setOpen(!open);
                }
            }}
            overlayStyle={{
                backgroundColor: 'transparent',
                elevation: 0,
                borderWidth: 0,
            }}
            transparent={true}>
            <Lottie
                source={require('../../assets/loader.json')}
                autoPlay
                loop={true}
                style={{
                    width: moderateScale(100),
                    height: moderateScale(100),
                }}
                resizeMode="cover"
            />
        </Overlay>
    );
};

export default LoadingOverlay;
