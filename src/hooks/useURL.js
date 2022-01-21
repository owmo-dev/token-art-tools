import React, {createContext, useContext, useReducer, useMemo} from 'react';

const URLContext = createContext();

const init = {
    url: '',
    isValid: false,
    iframeKey: '',
};

function urlReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'set': {
            return {
                ...state,
                url: dispatch.url,
                isValid: validateURL(dispatch.url),
                iframeKey: getRandomString(),
            };
        }
        case 'refresh': {
            return {...state, iframeKey: getRandomString()};
        }
        case 'clear': {
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
