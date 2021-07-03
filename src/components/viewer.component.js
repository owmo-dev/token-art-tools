import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";

import Usage from "./usage.component";

const Viewer = (props) => {
    const [url, setUrl] = useState("");
    const [isUrlValid, setUrlValid] = useState(false);
    const [iKey, setKey] = useState(0);

    const { hash } = props;

    function onChange(e) {
        if (url === e.target.value) return;
        setUrl(e.target.value);
        setUrlValid(isValidHttpUrl(e.target.value));
    }

    function handleClearURL() {
        setUrl("");
        setUrlValid(false);
    }

    return (
        <>
            <div style={{ width: "auto", height: 50, marginBottom: 10, marginTop: 10 }}>
                <Button
                    icon
                    disabled={!isUrlValid}
                    onClick={() => {
                        var iframe = window.document.querySelector("iframe").contentWindow;
                        if (iframe === undefined) return;
                        iframe.postMessage({ command: "screenshot", token: hash }, "*");
                    }}
                    style={{ float: "right", marginLeft: 20 }}
                >
                    <Icon name="camera" />
                </Button>
                <Button
                    icon
                    disabled={!isUrlValid}
                    floated="right"
                    style={{ float: "right", marginLeft: 20 }}
                    onClick={() => {
                        setKey(iKey + 1);
                    }}
                >
                    <Icon name="refresh" />
                </Button>
                <Input
                    label="localhost url"
                    fluid
                    placeholder="http://127.0.0.1:5500"
                    onChange={onChange}
                    value={url}
                    style={{ height: 36 }}
                    icon={
                        url !== "" ? (
                            <Icon
                                name="delete"
                                link
                                onClick={() => {
                                    handleClearURL();
                                }}
                            />
                        ) : null
                    }
                />
            </div>
            <div style={{ width: "100%", height: "calc(100% - 70px)" }}>
                {isUrlValid && hash !== undefined ? (
                    <iframe
                        id={new Date().getTime()}
                        title="token art tools viewer"
                        src={url + "?hash=" + hash}
                        style={{ width: "100%", height: "100%", border: 0 }}
                        key={iKey}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "#666", overflow: "auto" }}>
                        <Usage />
                    </div>
                )}
            </div>
        </>
    );
};

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default Viewer;
