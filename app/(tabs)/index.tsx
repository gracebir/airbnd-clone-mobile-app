/** @format */

import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExporeHeader from "@/components/ExporeHeader";
import Listings from "@/components/Listings";
import listings from "@/assets/data/airbnb-listings.json";
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
            <Listings category={category} listings={items} />
        </View>
    );
};

export default Page;
