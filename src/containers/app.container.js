import React, { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";
import "../css/style.css";

import LeftControls from "../components/panels/left-controls.component";
import MainViewer from "../components/panels/main-viewer.component";

import { ValueToHexPair, HexPairToValue } from "../helpers/token.helpers";

const App = () => {
    const [hash, setHash] = useState("0x0000000000000000000000000000000000000000000000000000000000000000");
    const [hashHistory, setHashHistory] = useState([]);

    const [values, setValues] = useState(() => {
        var v = {};
        for (let i = 0; i < 32; i++) {
            v[i] = 0;
        }
        return v;
    });

    const setValueAtIndex = (i, v) => {
        setValues((prev) => ({
            ...prev,
            [i]: v,
        }));
    };

    const setHashValues = (h) => {
        h = h.substring(2);
        for (let i = 0; i < 32; i++) {
            setValueAtIndex(i, HexPairToValue(h[i * 2] + h[i * 2 + 1]));
        }
    };

    useEffect(() => {
        var h = "0x";
        for (let i = 0; i < 32; i++) {
            h += ValueToHexPair(values[i]);
        }
        if (hash !== h) {
            var history = hashHistory;
            if (history[history.length - 1] === h) {
                history.pop();
            } else {
                if (hash !== undefined) history.push(hash);
            }
            setHashHistory(history);
            setHash(h);
        }
    }, [values, hash, hashHistory]);

    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <div style={{ width: 480, position: "absolute", top: 20, left: 20 }}>
                <LeftControls
                    hash={hash}
                    values={values}
                    hashHistory={hashHistory}
                    setValueAtIndex={setValueAtIndex}
                    setHashValues={setHashValues}
                />
            </div>
            <div
                style={{
                    marginLeft: 500,
                    padding: 20,
                    height: "100vh",
                    width: "auto",
                    minWidth: 800,
                }}
            >
                <MainViewer hash={hash} />
            </div>
        </div>
    );
};

export default App;
