/** @format */

import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExporeHeader from "@/components/ExporeHeader";
import listings from "@/assets/data/airbnb-listings.json";
import listingMaps from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
const Page = () => {
    const [category, setCategory] = useState("Tiny homes");
    const onDataChanged = (cat: string) => {
        console.log("Change", cat);
        setCategory(cat);
    };

    const items = useMemo(() => listings as any, []);
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExporeHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <ListingsMap listings={listingMaps} />
            <ListingsBottomSheet listings={items} category={category} />
        </View>
    );
};

export default Page;
