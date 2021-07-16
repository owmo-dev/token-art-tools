import React, { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";
import "../css/style.css";

import HashPairControls from "../components/hashpair-controls.component";
import Viewer from "../components/viewer.component";

const App = () => {
    const [hash, setHash] = useState("0x0000000000000000000000000000000000000000000000000000000000000000");
    const [hexValues, setHexValues] = useState(() => {
        var v = {};
        for (let i = 0; i < 32; i++) {
            v[i] = "00";
        }
        return v;
    });

    const updateHexValue = (i, v) => {
        setHexValues((prevState) => ({
            ...prevState,
            [i]: v,
        }));
    };

    useEffect(() => {
        var h = "0x";
        for (let i = 0; i < 32; i++) {
            h += hexValues[i];
        }
        if (hash !== h) setHash(h);
    }, [hexValues, hash]);

    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <div style={{ width: 480, position: "absolute", top: 20, left: 20 }}>
                <HashPairControls hash={hash} update={updateHexValue} />
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
                <Viewer hash={hash} />
            </div>
        </div>
    );
};

export default App;
