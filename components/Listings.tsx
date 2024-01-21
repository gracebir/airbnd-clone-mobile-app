/** @format */

import {
    View,
    Text,
    StyleSheet,
    ListRenderItem,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetFlatList,
    BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

type Props = {
    listings: Array<any>;
    refresh: number;
    category: string;
};

const Listings = ({ listings: items, refresh, category }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
        if (refresh) {
            scrollListTop();
        }
    }, [refresh]);

    const scrollListTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderRow: ListRenderItem<any> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                    style={styles.listing}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: item.medium_url }}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 30,
                            top: 30,
                            zIndex: 10,
                        }}
                    >
                        <Ionicons
                            size={24}
                            color={"#000"}
                            name='heart-outline'
                        />
                    </TouchableOpacity>
                    <View style={styles.cardBody}>
                        <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons name='star' size={16} />
                            <Text style={{ fontFamily: "mon-sb" }}>
                                {item.review_scores_rating / 20}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: "mon" }}>
                            {item.room_type}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Text style={{ fontFamily: "mon-sb" }}>
                            ${item.price}
                        </Text>
                        <Text style={{ fontFamily: "mon" }}>night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
    return (
        <View style={styles.container}>
            <BottomSheetFlatList
                renderItem={renderRow}
                data={loading ? [] : items}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listing: {
        padding: 16,
        position: "relative",
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    cardBody: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Listings;
