/** @format */

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
    Facebook = "oauth_facebook",
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({
        strategy: "oauth_google",
    });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: facebookAuth } = useOAuth({
        strategy: "oauth_facebook",
    });

    const onSelectAuth = async (stategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[stategy];
        try {
            const { createdSessionId, setActive } = await selectedAuth();
            console.log("is authenticated", createdSessionId);
            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (error) {
            console.error("Oauth error: ", error);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
                autoCapitalize='none'
                placeholder='Email'
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.seperatorView}>
                <View style={styles.seperatorLine} />
                <Text style={styles.seperatorText}>or</Text>
                <View style={styles.seperatorLine} />
            </View>
            <View style={{ gap: 10 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons
                        name='call-outline'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with phone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSelectAuth(Strategy.Apple)}
                    style={styles.btnOutline}
                >
                    <Ionicons
                        name='md-logo-apple'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with apple
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSelectAuth(Strategy.Google)}
                    style={styles.btnOutline}
                >
                    <Ionicons
                        name='md-logo-google'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSelectAuth(Strategy.Facebook)}
                    style={styles.btnOutline}
                >
                    <Ionicons
                        name='md-logo-facebook'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with facebook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
    },
    seperatorView: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: 30,
    },
    seperatorLine: {
        flex: 1,
        borderColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    seperatorText: {
        fontFamily: "mon-sb",
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "mon-sb",
    },
});
export default Page;
