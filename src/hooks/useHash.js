import React, {createContext, useContext, useReducer} from 'react';

const HASH_0x32 = 0;

const HashContext = createContext();

function init(type) {
    switch (type) {
        case HASH_0x32:
            const values = new Array(32).fill(0);
            return {
                type: type,
                hash: convertValuesToHash(type, values),
                values: values,
                history: [],
            };
        default:
            throw new Error(`useHash type '${type}' not supported`);
    }
}

function hashReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'random':
            var data = getRandomHashValues(state.type);
            data['history'] = [...state.history, state.hash];
            return {...state, ...data};
        case 'setHash':
            var data = {hash: dispatch.hash};
            data['history'] = [...state.history, state.hash];
            // !!! need to update values based on hash
            return {...state, ...data};
        case 'back':
            var lastHash = state.history[state.history.length - 1];
            var history = state.history;
            history.pop();
            var data = {hash: lastHash, history: history};
            // need to update values based on hash
            return {...state, ...data};
        case 'reset':
            return {...state, ...init(state.type)};
        case 'setValue':
            var values = state.values;
            values[dispatch.index] = dispatch.value;
            var data = {
                hash: convertValuesToHash(state.type, values),
                values: values,
            };
            data['history'] = [...state.history, state.hash];
            return {...state, ...data};
        default:
            throw new Error(`hashReducer type '${dispatch.type}' not supported`);
    }
}

function getRandomHashValues(type) {
    switch (type) {
        case HASH_0x32:
            var values = Array.from({length: 32}, () => Math.floor(Math.random() * 255));
            return {
                hash: convertValuesToHash(type, values),
                values: values,
            };
        default:
            throw new Error(`getRandomHash type '${type}' not supported`);
    }
}

function convertValuesToHash(type, values) {
    switch (type) {
        case HASH_0x32:
            return '0x' + values.map(x => Number(x).toString(16).padStart(2, '0')).join('');
        default:
            throw new Error(`convertValuesToHash type '${type}' not supported`);
    }
}

function HashProvider(props) {
    const [state, dispatch] = useReducer(hashReducer, HASH_0x32, init);
    const value = [state, dispatch];
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
