import React, {createContext, useContext, useReducer, useMemo} from 'react';
import {iota} from '../helpers/iota';
import {clamp} from '../helpers/math';

const AutomationContext = createContext();

export const {A_START, A_TICK, A_STOP, A_EXPORT, A_RESET} = iota();

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
        case A_START: {
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
        case A_TICK: {
            let tick = state.tick + 1;
            let progress = clamp(parseInt((tick / state.total) * 100), 0, 100);
            return {
                ...state,
                status: 'active',
                progress: progress,
                tick: tick,
            };
        }
        case A_STOP: {
            return {
                ...state,
                status: 'stopping',
                progress: 100,
                tick: state.total,
            };
        }
        case A_EXPORT: {
            return {
                ...state,
                status: 'exporting',
                progress: 100,
                tick: state.total,
            };
        }
        case A_RESET: {
            return init;
        }
        default:
            throw new Error(`automationReducer type '${dispatch.type}' not supported`);
    }
}

function AutomationProvider(props) {
    const [state, dispatch] = useReducer(automationReducer, init);
    const value = useMemo(() => [state, dispatch], [state]);
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
