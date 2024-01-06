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

const Page = () => {
    useWarmUpBrowser();
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
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons
                        name='md-logo-apple'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with apple
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons
                        name='md-logo-google'
                        size={24}
                        style={defaultStyles.btnIcon}
                    />
                    <Text style={styles.btnOutlineText}>
                        Continue with google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline}>
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
