import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useAppSelector } from "../app/hooks";

const Counter = () => {
    const counter = useAppSelector(state => state.counter.value)
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.textCounter}>Counter</Text>
            <Text style={styles.numberCounter}>{counter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textCounter: {
        fontSize: 30,
        fontWeight: "bold",
    },
    numberCounter: {
        fontSize: 62,
        color: "green",
        fontWeight: "bold",
    }
})

export default Counter;