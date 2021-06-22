import React, { useState } from "react";
import { Input } from "semantic-ui-react";

const Viewer = (props) => {
    const [url, setUrl] = useState("");

    function onChange(e) {
        if (isValidHttpUrl(e.target.value)) {
            setUrl(e.target.value);
        }
    }

    return (
        <>
            <div style={{ width: "100%", height: 50, marginBottom: 10 }}>
                <Input label="localhost URL" fluid placeholder="ex: http://127.0.0.1:5500" onChange={onChange} />
            </div>
            {url !== undefined && url !== "" && props.hash !== undefined ? (
                <embed
                    id="embed"
                    title="token art tools viewer"
                    style={{ width: "100%", height: "calc(100% - 60px)" }}
                    src={url + "?hash=" + props.hash}
                />
            ) : null}
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
