import React, {createContext, useContext, useReducer} from 'react';

const AutomationContext = createContext();

const init = {
    state: 'idle',
};

function automationReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'start': {
            return {...state};
        }
        case 'stop': {
            return {...state};
        }
        default:
            throw new Error(`automationReducer type '${dispatch.type}' not supported`);
    }
}

function AutomationProvider(props) {
    const [state, dispatch] = useReducer(automationReducer, init);
    const value = [state, dispatch];
    return <AutomationContext.Provider value={value} {...props} />;
}

function useAutomation() {
    const context = useContext(AutomationContext);
    if (!context) {
        throw new Error(`useAutomation must be used within the AutomationProvider`);
    }
    return context;
}

export {useAutomation, AutomationProvider};
