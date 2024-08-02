import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Table from "../../Screens/Table";
import Onboard from "@/Screens/components/Onboard";
import Box from "@/componentsCustom/Globals/Box";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingOverlay from "@/componentsCustom/Globals/LoadingOverlay";
export interface MKT400Interface {
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  phone: string;
  usdot_number: string;
  mc_mx_ff_number: string;
  power_units: string;
  out_of_service_date: string;
}
const API_URL = "https://mkt400-data.onrender.com";

const fetchData = async ({ page = 0, itemsPerPage = 10 }) => {
  const { data } = await axios.get(
    `${API_URL}/?page=0&itemsPerPage=10000`
  );
  console.log(data, "from fetching")
  return data.data;
};
export default function TabOneScreen() {
  const [showOnboard, setShowOnboard] = useState(true);
  const [data, setData] = useState<MKT400Interface[]>()
  const [page, setPage] = React.useState<number>(0);

  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  useEffect(() => {
    console.log(itemsPerPage, "itemsPerPage")

  }, [itemsPerPage])

  const { data: queryData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetchData({ page, itemsPerPage }),
  });
  useEffect(() => {
    setData(queryData)
    let timer;

    (() => {
      setTimeout(() => {
        setShowOnboard(false)
      }, 6000);
    })()

    return clearTimeout(timer)
  }, [data, isLoading])
  // useFocusEffect(
  //   useCallback(() => {
  //     let timer;
  //     (() => {
  //       setTimeout(() => {
  //         setShowOnboard(false)
  //       }, 6000);
  //     })()
  //     return clearTimeout(timer)
  //   }, [])
  // )

  return (
    <ScrollView>
      <LoadingOverlay open={isLoading} />
      <Box opacity={showOnboard ? 0.6 : 1}>
        {
          data && (
            <Table
              data={data}
              itemsPerPage={itemsPerPage}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              page={page}
              setPage={setPage}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          )
        }
      </Box>
      <Onboard showOnboard={showOnboard} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
