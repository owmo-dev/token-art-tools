import React, { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";
import "../css/style.css";

import LeftControls from "../components/panels/left-controls.component";
import MainViewer from "../components/panels/main-viewer.component";

import { ValueToHexPair, HexPairToValue } from "../helpers/token.helpers";
import { ValidateURL } from "../helpers/url.helpers";

const nullHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

const App = () => {
    const [url, setUrl] = useState("");
    const [isValidUrl, setUrlValid] = useState(false);

    const [hash, setHash] = useState(nullHash);
    const [hashHistory, setHashHistory] = useState([]);

    const [values, setValues] = useState(() => {
        var v = {};
        for (let i = 0; i < 32; i++) {
            v[i] = 0;
        }
        return v;
    });

    const [randomHash, triggerRandom] = useState(false);

    useEffect(() => {
        if (randomHash) triggerRandom(false);
    }, [randomHash]);

    const screenshot = () => {
        var iframe = window.document.querySelector("iframe").contentWindow;
        if (iframe === undefined) return;
        iframe.postMessage({ command: "screenshot", token: hash }, "*");
    };

    const [run, setRun] = useState(false);
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState(null);

    const runAutomation = (count, wait) => {
        var current = 0;
        setProgress(0);
        setRun(true);
        triggerRandom(true);
        function loop() {
            setTimeout(function () {
                current++;
                setProgress((current / count) * 100);
                setCurrent(current);
                if (current < count) {
                    loop();
                } else {
                    setRun(false);
                }
            }, wait);
        }
        loop();
    };

    useEffect(() => {
        if (!run) {
            if (current !== null) setCurrent(null);
            return;
        }
        if (current === null || current === 0) return;
        triggerRandom(true);
        screenshot();
    }, [run, current]);

    const [iFrameKey, setIframeKey] = useState(0);

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

    const setUrlValue = (u) => {
        if (url === u) return;
        setUrl(u);
        setUrlValid(ValidateURL(u));
    };

    const clearHistory = () => {
        setHashValues(nullHash);
        setHashHistory([nullHash]);
    };

    const refresh = () => {
        setIframeKey(iFrameKey + 1);
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
                    clearHistory={clearHistory}
                    isValidUrl={isValidUrl}
                    randomHash={randomHash}
                    triggerRandom={triggerRandom}
                    runAutomation={runAutomation}
                    progress={progress}
                    setRun={setRun}
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
                <MainViewer
                    hash={hash}
                    url={url}
                    isValidUrl={isValidUrl}
                    setUrlValue={setUrlValue}
                    iFrameKey={iFrameKey}
                    refresh={refresh}
                    screenshot={screenshot}
                />
            </div>
        </div>
    );
};

export default App;
