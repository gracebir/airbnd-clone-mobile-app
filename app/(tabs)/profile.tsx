/** @format */

import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const Page = () => {
    const { isSignedIn, signOut } = useAuth();
    return (
        <View>
            {isSignedIn ? (
                <Button title='Log out' onPress={() => signOut()} />
            ) : (
                <Link href={"/(modals)/login"}>
                    <Text>Login</Text>
                </Link>
            )}
        </View>
    );
};

export default Page;
