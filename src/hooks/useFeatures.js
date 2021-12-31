import React, {createContext, useContext, useReducer} from 'react';

const FeaturesContext = createContext();

const init = {
    data: {},
};

function automationReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'set': {
            return {...state, data: dispatch.data};
        }
        case 'clear': {
            return init;
        }
        default:
            throw new Error(`automationReducer type '${dispatch.type}' not supported`);
    }
}

function FeaturesProvider(props) {
    const [state, dispatch] = useReducer(automationReducer, init);
    const value = [state, dispatch];
    return <FeaturesContext.Provider value={value} {...props} />;
}

function useFeatures() {
    const context = useContext(FeaturesContext);
    if (!context) {
        throw new Error(`useFeatures must be used within the FeaturesProvider`);
    }
    return context;
}

export {useFeatures, FeaturesProvider};
