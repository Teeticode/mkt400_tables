import { MKT400Interface } from '@/app/(tabs)'
import Box from '@/componentsCustom/Globals/Box'
import MainButton from '@/componentsCustom/Globals/MainButton'
import MainText from '@/componentsCustom/Globals/MainText'
import Colors from '@/constantsCustom/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { ScreenWidth } from '@rneui/base'
import { Overlay } from '@rneui/themed'
import moment from 'moment'
import React, { Dispatch, SetStateAction } from 'react'
import { useColorScheme } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { moderateScale, verticalScale } from 'react-native-size-matters'

type Props = {
    data: MKT400Interface,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DataView = ({ data, open, setOpen }: Props) => {
    const colorScheme = useColorScheme()
    return (
        <Overlay isVisible={open} overlayStyle={{
            backgroundColor: colorScheme === 'dark' ? "#343434" : "#fff"
        }} onBackdropPress={() => {
            setOpen(!open)
        }}>
            <Animated.View entering={FadeInUp} key={`${open}`}>
                <Box width={ScreenWidth * .9} color={colorScheme === 'dark' ? "#343434" : "#fff"}>
                    <Box align='flex-end' my={moderateScale(4)}>
                        <MainButton onPress={() => setOpen(!open)} width={moderateScale(20)} height={moderateScale(20)}>
                            <FontAwesome name='close' size={moderateScale(15)} />
                        </MainButton>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>created at:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'md'}>{moment(data?.created_dt).format('YYYY-MM-DD')}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>modified date:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'md'}>{moment(data?.data_source_modified_dt).format('YYYY-MM-DD')}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>entity type:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'md'}>{data?.entity_type}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>operating status:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.operating_status ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>legal name:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.legal_name ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>DBA name:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.dba_name ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>phone:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.phone ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>mc_mx_ff_number:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.mc_mx_ff_number ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>power_units:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.power_units ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>out of service date:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'md'}>{moment(data?.out_of_service_date).format('YYYY-MM-DD')}</MainText>
                        </Box>
                    </Box>
                    <Box direction='row' my={verticalScale(10)} align='center' justify='space-between'>
                        <Box>
                            <MainText size={'md'}>usdot number:</MainText>
                        </Box>
                        <Box>
                            <MainText size={'xs'}>{data?.usdot_number ?? "Pending"}</MainText>
                        </Box>
                    </Box>
                </Box>
            </Animated.View>
        </Overlay>
    )
}

export default DataView