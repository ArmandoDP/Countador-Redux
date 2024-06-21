import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppDispatch } from "../app/hooks";
import { increment, decrement, incremenByAmount, decrementByAmount } from "../features/counter/counterSlide";

const ButtonRedux = () => {

    const dispatch = useAppDispatch();

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
                <Text style={styles.text}>Increment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonD} onPress={() => dispatch(decrement())}>
                <Text style={styles.text}>Decrement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => dispatch(incremenByAmount(10))}>
                <Text style={styles.text}>Increment +10</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonD} onPress={() => dispatch(decrementByAmount(10))}>
                <Text style={styles.text}>Increment -10</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonD: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ButtonRedux;