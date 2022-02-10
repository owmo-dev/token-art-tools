import React, {createContext, useContext, useReducer, useMemo} from 'react';
import {iota} from '../helpers/iota';

const URLContext = createContext();

export const {U_SET, U_REFRESH, U_CLEAR} = iota();

const init = {
    url: '',
    isValid: false,
    iframeKey: '',
};

function urlReducer(state, dispatch) {
    switch (dispatch.type) {
        case U_SET: {
            return {
                ...state,
                url: dispatch.url,
                isValid: validateURL(dispatch.url),
                iframeKey: getRandomString(),
            };
        }
        case U_REFRESH: {
            return {...state, iframeKey: getRandomString()};
        }
        case U_CLEAR: {
            return init;
        }
        default:
            throw new Error(`urlReducer type '${dispatch.type}' not supported`);
    }
}

function getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function validateURL(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
}

function URLProvider(props) {
    const [state, dispatch] = useReducer(urlReducer, init);
    const value = useMemo(() => [state, dispatch], [state]);
    return <URLContext.Provider value={value} {...props} />;
}

function useURL() {
    const context = useContext(URLContext);
    if (!context) {
        throw new Error(`useURL must be used within the URLProvider`);
    }
    return context;
}

export {useURL, URLProvider};
