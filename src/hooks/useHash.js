import React, {createContext, useContext, useReducer, useMemo} from 'react';
import {iota} from '../helpers/iota';

const HashContext = createContext();

export const {H_RANDOM, H_SET, H_BACK, H_CLEAR, H_SET_VALUE, H_LOCK, H_LOCK_NUM} = iota();

const actions = {};

function init() {
    let values = new Array(32).fill(0);
    let locked = new Array(32).fill(false);
    return {
        number: 0,
        hash: convertValuesToHash(values),
        values: values,
        locked: locked,
        numberLocked: false,
        history: [],
        params: {
            min: 0,
            max: 255,
            step: 1,
            count: 32,
            start: 0,
            editions: 1000,
        },
    };
}

function hashReducer(state, dispatch) {
    switch (dispatch.type) {
        case H_RANDOM: {
            let data = generateRandomValues(state);
            data['history'] = [...state.history, {hash: state.hash, number: state.number}];
            return {...state, ...data};
        }
        case H_SET: {
            let hash = dispatch?.hash ?? state.hash;
            let number = dispatch?.number ?? state.number;
            let values = convertHashToValues(hash);
            let history = [...state.history, {hash: state.hash, number: state.number}];
            let data = {hash: hash, number: number, values: values, history: history};
            return {...state, ...data};
        }
        case H_BACK: {
            let last = state.history[state.history.length - 1];
            let hash = last.hash;
            let number = last.number;
            let history = state.history;
            history.pop();
            let values = convertHashToValues(hash);
            let data = {hash: hash, number: number, values: values, history: history};
            return {...state, ...data};
        }
        case H_CLEAR: {
            return {...state, ...init()};
        }
        case H_SET_VALUE: {
            let values = state.values;
            values[dispatch.index] = dispatch.value;
            let data = {
                hash: convertValuesToHash(values),
                values: values,
            };
            data['history'] = [...state.history, {hash: state.hash, number: state.number}];
            return {...state, ...data};
        }
        case H_LOCK: {
            let locked = state.locked;
            locked[dispatch.index] = !locked[dispatch.index];
            return {...state, ...{locked: locked}};
        }
        case H_LOCK_NUM: {
            let locked = !state.numberLocked;
            return {...state, numberLocked: locked};
        }
        default:
            throw new Error(`hashReducer type '${dispatch.type}' not supported`);
    }
}

function generateRandomValues(state) {
    let values = state.values;
    for (let i = 0; i < 32; i++) {
        if (!state.locked[i]) values[i] = Math.floor(Math.random() * 255);
    }
    let number = !state.numberLocked ? Math.floor(state.params.start + Math.random() * state.params.editions) : state.number;
    return {
        hash: convertValuesToHash(values),
        values: values,
        number: number,
    };
}

function convertHashToValues(hash) {
    let values = [];
    hash = hash.substring(2);
    for (let i = 0; i < hash.length; i += 2) {
        values.push(parseInt('0x' + hash[i] + hash[i + 1]));
    }
    return values;
}

function convertValuesToHash(values) {
    return '0x' + values.map(x => Number(x).toString(16).padStart(2, '0')).join('');
}

function HashProvider(props) {
    const [state, dispatch] = useReducer(hashReducer, null, init);
    const value = useMemo(() => [state, dispatch], [state]);
    return <HashContext.Provider value={value} {...props} />;
}

function useHash() {
    const context = useContext(HashContext);
    if (!context) {
        throw new Error(`useHash must be used within the HashProvider`);
    }
    return context;
}

export {useHash, HashProvider, actions};
