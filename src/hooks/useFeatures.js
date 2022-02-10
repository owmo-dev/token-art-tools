import React, {createContext, useContext, useReducer, useMemo} from 'react';
import {iota} from '../helpers/iota';

const FeaturesContext = createContext();

export const {F_SET, F_CLEAR} = iota();

const init = {
    data: {},
};

function automationReducer(state, dispatch) {
    switch (dispatch.type) {
        case F_SET: {
            return {...state, data: dispatch.data};
        }
        case F_CLEAR: {
            return init;
        }
        default:
            throw new Error(`automationReducer type '${dispatch.type}' not supported`);
    }
}

function FeaturesProvider(props) {
    const [state, dispatch] = useReducer(automationReducer, init);
    const value = useMemo(() => [state, dispatch], [state]);
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
