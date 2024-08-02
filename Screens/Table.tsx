import * as React from 'react';
import { DataTable } from 'react-native-paper';

import moment from "moment"
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import MainText from '@/componentsCustom/Globals/MainText';
import { FlashMessage } from '@/componentsCustom/Globals/FlashMessage';
import { MKT400Interface } from '@/app/(tabs)';
import MainButton from '@/componentsCustom/Globals/MainButton';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScreenWidth } from '@rneui/base';
import { moderateScale } from 'react-native-size-matters';
import DataView from './components/DataView';
type Props = {
    data: any,
    numberOfItemsPerPageList: number[],
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    itemsPerPage: number,
    onItemsPerPageChange: React.Dispatch<React.SetStateAction<any>>,

}
const Table = ({ data, numberOfItemsPerPageList, page, setPage, itemsPerPage, onItemsPerPageChange }: Props) => {
    const [from, setFrom] = React.useState(0);
    const [to, setTo] = React.useState(20);

    const [step, setStep] = React.useState(1)
    const [selectedItem, setSelectedItem] = React.useState<any>()
    const [viewSelectedItem, setViewedSelectedItem] = React.useState(false)
    const items2 = React.useState<any>(data);
    const items: MKT400Interface[] = items2[0];
    const totalPages = Math.ceil(items.length / itemsPerPage);

    React.useEffect(() => {
        // console.log(items)
        setPage(0)
    }, [items]);

    React.useEffect(() => {
        // setPage(page + 1);
        const from = page * itemsPerPage;
        const to = Math.min((page + 1) * itemsPerPage, items.length);
        setFrom(from)
        setTo(to)
        console.log(to, 'to');
        console.log(items.length, 'items length')
    }, [itemsPerPage, page]);
    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            FlashMessage(
                'End of columns',
                "warning"
            );
        }
    };
    const onBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    };
    const fling = Gesture.Fling()
        .direction(Directions.LEFT)

        .onEnd((event) => {
            runOnJS(handleNext)();
        });
    const swipeBack = Gesture.Fling()
        .direction(Directions.RIGHT)

        .onEnd((event) => {
            runOnJS(onBack)();
        });
    const swipes = Gesture.Simultaneous(swipeBack, fling);

    return (
        <GestureDetector gesture={swipes}>

            <DataTable>
                <DataView open={viewSelectedItem} setOpen={setViewedSelectedItem} data={selectedItem} />
                <DataTable.Header>
                    {
                        step === 1 && (
                            <Animated.View style={{ flexDirection: "row", width: "100%" }}>
                                <DataTable.Title >created_dt</DataTable.Title>
                                <DataTable.Title >modified_dt</DataTable.Title>
                                <DataTable.Title >entity_type</DataTable.Title>
                                <DataTable.Title >operating_status</DataTable.Title>
                            </Animated.View>
                        )
                    }
                    {
                        step === 2 && (
                            <Animated.View style={{ flexDirection: "row", width: "100%" }}>
                                <DataTable.Title >legal_name</DataTable.Title>
                                <DataTable.Title >dba_name</DataTable.Title>
                                <DataTable.Title >phone</DataTable.Title>

                            </Animated.View>
                        )
                    }
                    {
                        step === 3 && (
                            <Animated.View style={{ flexDirection: "row", width: "100%" }}>
                                <DataTable.Title >mc_mx_ff_number</DataTable.Title>
                                <DataTable.Title >power_units</DataTable.Title>
                                <DataTable.Title >out_of_service_date</DataTable.Title>
                                <DataTable.Title >usdot_number</DataTable.Title>
                            </Animated.View>

                        )
                    }

                    {/* 
                
                 */}

                </DataTable.Header>

                {items?.slice(from, to).map((item: any) => (
                    <MainButton color='transparent' onPress={() => {
                        setSelectedItem(item)
                        setViewedSelectedItem(true)
                    }} key={item.legal_name}>
                        <DataTable.Row >
                            {
                                step === 1 && (

                                    <Animated.View style={{ flexDirection: "row", width: "100%" }}>
                                        <DataTable.Cell >{moment(item.created_dt).format('YYYY-MM-DD')}</DataTable.Cell>
                                        <DataTable.Cell >{moment(item.data_source_modified_dt).format('YYYY-MM-DD')}</DataTable.Cell>
                                        <DataTable.Cell >{item.entity_type}</DataTable.Cell>
                                        <DataTable.Cell >{item.operating_status}</DataTable.Cell>
                                    </Animated.View>

                                )
                            }
                            {
                                step === 2 && (
                                    <Animated.View style={{ flexDirection: "row", width: "100%" }}>

                                        <DataTable.Cell >{item.legal_name}</DataTable.Cell>

                                        <DataTable.Cell style={{ alignItems: "center" }} centered={true}>{item.dba_name}</DataTable.Cell>

                                        <DataTable.Cell >{item.phone}</DataTable.Cell>

                                    </Animated.View>
                                )
                            }
                            {
                                step === 3 && (
                                    <Animated.View style={{ flexDirection: "row", width: "100%" }}>
                                        <DataTable.Cell >{item.mc_mx_ff_number}</DataTable.Cell>
                                        <DataTable.Cell centered={true} ><MainText align='center' style={{ marginLeft: moderateScale(20) }} size={'sm'}>{item.power_units}</MainText></DataTable.Cell>
                                        <DataTable.Cell >{item.out_of_service_date?.split("").length > 0 ? item.out_of_service_date : "No Date"}</DataTable.Cell>
                                        <DataTable.Cell >{item.usdot_number}</DataTable.Cell>
                                    </Animated.View>
                                )
                            }


                            {/*
                     
                     */}
                        </DataTable.Row>
                    </MainButton>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={totalPages}
                    onPageChange={(newPage) => {
                        if (newPage > page && page < totalPages - 1) {
                            setPage(page + 1);
                        } else if (newPage < page && page > 0) {
                            setPage(page - 1);
                        }
                    }}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={(newItemsPerPage) => {
                        onItemsPerPageChange(newItemsPerPage);
                        setPage(0); // Reset to first page when changing items per page
                    }}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </GestureDetector>
    );
};

export default Table;