/** @format */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    listings: Array<any>;
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["10%", "100%"], []);
    const [refresh, setRefresh] = useState<number>(0);
    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };
    return (
        <BottomSheet
            handleIndicatorStyle={{
                backgroundColor: Colors.grey,
            }}
            index={1}
            style={styles.sheetContainer}
            enablePanDownToClose={false}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
        >
            <View style={styles.container}>
                <Listings
                    refresh={refresh}
                    listings={listings}
                    category={category}
                />
                <View style={styles.absoluteButton}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                            Map
                        </Text>
                        <Ionicons color={"#FFF"} name='map' size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sheetContainer: {
        backgroundColor: "#FFF",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    absoluteButton: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 30,
        gap: 8,
    },
});
