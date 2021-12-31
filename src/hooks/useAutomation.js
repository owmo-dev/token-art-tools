import React, {createContext, useContext, useReducer} from 'react';

const AutomationContext = createContext();

const init = {
    status: 'idle',
    total: 0,
    doScreenshot: true,
    doCSVExport: false,
    waitTime: 2000,
    progress: 0,
    tick: 0,
};

function automationReducer(state, dispatch) {
    switch (dispatch.type) {
        case 'start': {
            return {
                ...state,
                status: 'active',
                total: dispatch.total,
                doScreenshot: dispatch.doScreenshot,
                doCSVExport: dispatch.doCSVExport,
                waitTime: dispatch.waitTime,
                progress: 0,
                tick: 0,
            };
        }
        case 'tick': {
            let tick = state.tick + 1;
            let progress = parseInt((tick / state.total) * 100);
            return {
                ...state,
                status: 'active',
                progress: progress,
                tick: tick,
            };
        }
        case 'stop': {
            return {
                ...state,
                status: 'stopping',
                progress: 100,
                tick: state.total,
            };
        }
        case 'reset': {
            return init;
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
