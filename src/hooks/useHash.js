import React, {createContext, useContext, useReducer} from 'react';

const HashContext = createContext();

const HASH_0x32 = 0;
const ZERO_0x32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

function init(type) {
    switch (type) {
        case HASH_0x32:
            return {
                type: type,
                hash: ZERO_0x32,
                values: new Array(32).fill(0),
                history: [],
            };
        default:
            throw new Error(`useHash type '${type}' not supported`);
    }
}

function hashReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'random':
            return {...state, ...getRandomHashValues(state.type)};
        default:
            throw new Error(`hashReducer type '${dispatch.type}' not supported`);
    }
}

function getRandomHashValues(type) {
    switch (type) {
        case HASH_0x32:
            const values = Array.from({length: 32}, () => Math.floor(Math.random() * 255));
            return {
                hash: '0x' + values.map(x => Number(x).toString(16)).join(''),
                values: values,
            };
        default:
            throw new Error(`getRandomHash type '${type}' not supported`);
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
