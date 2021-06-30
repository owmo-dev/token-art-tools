import React, { useState } from "react";
import { Grid, Input, Button, Icon } from "semantic-ui-react";

import Usage from "./usage.component";

const Viewer = (props) => {
    const [url, setUrl] = useState("");

    const { hash } = props;

    function onChange(e) {
        if (isValidHttpUrl(e.target.value)) {
            setUrl(e.target.value);
        } else {
            setUrl("");
        }
    }

    return (
        <>
            <div style={{ width: "auto", height: 50, marginBottom: 10, marginTop: 10 }}>
                <Button
                    disabled={url === ""}
                    floated="right"
                    onClick={() => {
                        var iframe = window.document.getElementById("iframe-viewer").contentWindow;
                        if (iframe === undefined) return;
                        iframe.postMessage({ command: "screenshot", token: hash }, "*");
                    }}
                    style={{ float: "right", marginLeft: 20 }}
                >
                    <Icon name="camera" />
                    Screenshot Artwork
                </Button>
                <Input
                    label="localhost URL"
                    fluid
                    placeholder="http://127.0.0.1:5500"
                    onChange={onChange}
                    style={{ height: 36 }}
                />
            </div>
            <div style={{ width: "100%", height: "calc(100% - 70px)" }}>
                {url !== undefined && url !== "" && hash !== undefined ? (
                    <iframe
                        id="iframe-viewer"
                        title="token art tools viewer"
                        src={url + "?hash=" + hash}
                        style={{ width: "100%", height: "100%", border: 0 }}
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
