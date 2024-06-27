import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 1,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            if (state.value > 897) {
                state.value = 898;
                return;
            }
            state.value++;
        },
        decrement: (state) => {
            if (state.value < 1) {;
                return state;
            }
            state.value--;
        },
        incremenByAmount: (state, action: PayloadAction<number>) => {
            if (state.value + action.payload > 897) {
                state.value = 898;
            } else {
                state.value += action.payload;
            }
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            if (state.value - action.payload < 1) {
                return state;
            } else {
                state.value -= action.payload;
            }
        },
        reset: (state) => {
            state.value = initialState.value;
        }
    }
});

export const { increment, decrement, incremenByAmount, decrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;