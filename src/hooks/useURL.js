import React, {createContext, useContext, useReducer} from 'react';

const URLContext = createContext();

const init = {
    url: '',
    isValid: false,
};

function urlReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'set': {
            return {
                url: dispatch.url,
                isValid: validateURL(dispatch.url),
            };
        }
        case 'clear': {
            return init;
        }
        default:
            throw new Error(`urlReducer type '${dispatch.type}' not supported`);
    }
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
    const value = [state, dispatch];
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
