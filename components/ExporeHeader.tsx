/** @format */

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
    {
        name: "Tiny homes",
        icon: "home",
    },
    {
        name: "Cabins",
        icon: "house-siding",
    },
    {
        name: "Trending",
        icon: "local-fire-department",
    },
    {
        name: "Play",
        icon: "videogame-asset",
    },
    {
        name: "City",
        icon: "apartment",
    },
    {
        name: "Beachfront",
        icon: "beach-access",
    },
    {
        name: "Countryside",
        icon: "nature-people",
    },
];

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExporeHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<Array<TouchableOpacity>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({
                x: x - 16,
                y: 0,
                animated: true,
            });
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    };
    return (
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={"/(modals)/booking"} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='search' size={24} />
                        <View>
                            <Text
                                style={{ fontFamily: "mon-sb", fontSize: 18 }}
                            >
                                Where to
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "mon",
                                    color: Colors.grey,
                                }}
                            >
                                Anywhere . Any week . Add guests
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons size={24} name='options-outline' />
                </TouchableOpacity>
            </View>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={{
                    alignContent: "center",
                    gap: 20,
                    paddingHorizontal: 16,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((item, index) => (
                    <TouchableOpacity
                        style={
                            activeIndex === index
                                ? styles.categoryBtnActive
                                : styles.categoryBtn
                        }
                        onPress={() => selectCategory(index)}
                        ref={(el) => itemRef.current[index] == el}
                        key={index}
                    >
                        <MaterialIcons
                            color={activeIndex === index ? "#000" : Colors.grey}
                            size={24}
                            name={item.icon as any}
                        />
                        <Text
                            style={
                                activeIndex === index
                                    ? styles.categoryTextActive
                                    : styles.categoryText
                            }
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 30,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 10,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },

    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: 10,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 14,
        borderRadius: 40,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    categoryText: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: "#000",
    },
    categoryBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },
    categoryBtnActive: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});

export default ExporeHeader;
