import React, {createContext, useContext, useReducer, useMemo} from 'react';

const HashContext = createContext();

function init() {
    let values = new Array(32).fill(0);
    let locked = new Array(32).fill(false);
    return {
        hash: convertValuesToHash(values),
        values: values,
        locked: locked,
        number: 0,
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
        case 'random': {
            let data = generateRandomValues(state);
            data['history'] = [...state.history, state.hash];
            return {...state, ...data};
        }
        case 'setHash': {
            let hash = dispatch.hash;
            let history = [...state.history, hash];
            let values = convertHashToValues(state.type, hash);
            let data = {hash: hash, values: values, history: history};
            return {...state, ...data};
        }
        case 'back': {
            let hash = state.history[state.history.length - 1];
            let history = state.history;
            history.pop();
            let values = convertHashToValues(state.type, hash);
            let data = {hash: hash, values: values, history: history};
            return {...state, ...data};
        }
        case 'clear': {
            return {...state, ...init()};
        }
        case 'setValue': {
            let values = state.values;
            values[dispatch.index] = dispatch.value;
            let data = {
                hash: convertValuesToHash(values),
                values: values,
            };
            data['history'] = [...state.history, state.hash];
            return {...state, ...data};
        }
        case 'setNumber': {
            let data = {
                number: dispatch.value,
            };
            return {...state, ...data};
        }
        case 'toggle-locked': {
            let locked = state.locked;
            locked[dispatch.index] = !locked[dispatch.index];
            return {...state, ...{locked: locked}};
        }
        case 'toggle-number-locked': {
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

export {useHash, HashProvider};
