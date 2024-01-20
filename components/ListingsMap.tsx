/** @format */

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 52.535152,
    longitude: 13.390206,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
    const router = useRouter();
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`);
    };

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                coordinate={{
                    latitude: geometry.coordinates[0],
                    longitude: geometry.coordinates[1],
                }}
                key={`cluster-${id}`}
            >
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "mon-sb",
                        }}
                    >
                        {points}
                    </Text>
                </View>
            </Marker>
        );
    };
    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                clusterColor='#FFF'
                clusterTextColor='#000'
                showsUserLocation={true}
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                renderCluster={renderCluster}
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                ${item.properties.price}{" "}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    marker: {
        backgroundColor: "#FFF",
        padding: 6,
        elevation: 5,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: "mon-sb",
    },
});

export default ListingsMap;
