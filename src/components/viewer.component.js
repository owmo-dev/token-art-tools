import React, { useState } from "react";
import { Input } from "semantic-ui-react";

import Waiting from "./waiting.component";

const Viewer = (props) => {
    const [url, setUrl] = useState("");

    const { hash } = props;

    function onChange(e) {
        if (isValidHttpUrl(e.target.value)) {
            setUrl(e.target.value);
        }
    }

    return (
        <>
            <div style={{ width: "100%", height: 50, marginBottom: 10, marginTop: 10 }}>
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
                    <embed
                        id="embed-viewer"
                        title="token art tools viewer"
                        src={url + "?hash=" + hash}
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "#666", overflow: "auto" }}>
                        <Waiting />
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
