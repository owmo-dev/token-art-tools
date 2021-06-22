import React, { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";
import "../css/style.css";

import Title from "../components/title.component";
import HashPairControls from "../components/hashpair-controls.component";
import Viewer from "../components/viewer.component";

const App = () => {
    const [hash, setHash] = useState("0x0000000000000000000000000000000000000000000000000000000000000000");

    return (
        <div>
            <div style={{ width: 520, position: "absolute", top: 20, left: 20 }}>
                <Title />
                <HashPairControls />
            </div>
            <div
                style={{
                    marginLeft: 540,
                    padding: 20,
                    height: "100vh",
                    width: "auto",
                }}
            >
                <Viewer hash={hash} />
            </div>
        </div>
    );
};

export default App;
