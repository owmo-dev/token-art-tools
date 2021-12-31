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
        case 'random': {
            let data = getRandomHashValues(state.type);
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
        case 'reset': {
            return {...state, ...init(state.type)};
        }
        case 'setValue': {
            let values = state.values;
            values[dispatch.index] = dispatch.value;
            let data = {
                hash: convertValuesToHash(state.type, values),
                values: values,
            };
            data['history'] = [...state.history, state.hash];
            return {...state, ...data};
        }
        default:
            throw new Error(`hashReducer type '${dispatch.type}' not supported`);
    }
}

function getRandomHashValues(type) {
    switch (type) {
        case HASH_0x32: {
            let values = Array.from({length: 32}, () => Math.floor(Math.random() * 255));
            return {
                hash: convertValuesToHash(type, values),
                values: values,
            };
        }
        default:
            throw new Error(`getRandomHash type '${type}' not supported`);
    }
}

function convertHashToValues(type, hash) {
    switch (type) {
        case HASH_0x32: {
            let values = [];
            hash = hash.substring(2);
            for (let i = 0; i < hash.length; i += 2) {
                values.push(parseInt('0x' + hash[i] + hash[i + 1]));
            }
            return values;
        }
        default:
            throw new Error(`convertHashToValues type '${type}' not supported`);
    }
}

function convertValuesToHash(type, values) {
    switch (type) {
        case HASH_0x32: {
            return '0x' + values.map(x => Number(x).toString(16).padStart(2, '0')).join('');
        }
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
