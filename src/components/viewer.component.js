import React, { useState, useEffect } from "react";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";

import Usage from "./usage.component";

const Viewer = (props) => {
    const [url, setUrl] = useState("");
    const [isUrlValid, setUrlValid] = useState(false);
    const [iKey, setKey] = useState(0);

    const [value, setValue] = useState("fit");
    const [resolution, setResolution] = useState("100%");

    const { hash } = props;

    function onChange(e) {
        if (url === e.target.value) return;
        setUrl(e.target.value);
        var valid = isValidHttpUrl(e.target.value);
        setUrlValid(valid);
        if (!valid) {
            setValue("fit");
        }
    }

    function handleClearURL() {
        setUrl("");
        setUrlValid(false);
    }

    const resolutionOptions = [
        {
            key: "fit",
            text: "Fit Available Space",
            value: "fit",
        },
        {
            key: "512px",
            text: "512px Square",
            value: "512px",
        },
        {
            key: "1k",
            text: "1K Square",
            value: "1k",
        },
        {
            key: "2k",
            text: "2K Square",
            value: "2k",
        },
        {
            key: "4k",
            text: "4K Square",
            value: "4k",
        },
    ];

    function handleChange(e, d) {
        setValue(d.value);
    }

    function refresh() {
        setKey(iKey + 1);
    }

    useEffect(() => {
        console.log(value);
        switch (value) {
            case "512px":
                setResolution("512px");
                break;
            case "1k":
                setResolution("1024px");
                break;
            case "2k":
                setResolution("2048px");
                break;
            case "4k":
                setResolution("4096px");
                break;
            default:
            case "fit":
                setResolution("100%");
                break;
        }
        refresh();
    }, [value]);

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
                    onClick={() => {
                        var iframe = window.document.querySelector("iframe");
                        const w = iframe.clientWidth;
                        const h = iframe.clientHeight;
                        window.open(url + "?hash=" + hash, "", `top=100, width=${w}, height=${h}`);
                    }}
                    style={{ float: "right", marginLeft: 20 }}
                >
                    <Icon name="external" />
                </Button>
                <Button
                    icon
                    disabled={!isUrlValid}
                    floated="right"
                    style={{ float: "right", marginLeft: 20 }}
                    onClick={refresh}
                >
                    <Icon name="refresh" />
                </Button>
                <Dropdown
                    selection
                    placeholder="Fit Available Space"
                    disabled={!isUrlValid}
                    options={resolutionOptions}
                    value={value}
                    onChange={handleChange}
                    style={{ float: "right", marginLeft: 20 }}
                />
                <Input
                    label="URL"
                    fluid
                    placeholder="http://127.0.0.1:5500"
                    onChange={onChange}
                    value={url}
                    style={{ height: 38 }}
                    icon={
                        url !== "" ? (
                            <Icon
                                name="delete"
                                link
                                onClick={() => {
                                    handleClearURL();
                                    setValue("fit");
                                }}
                            />
                        ) : null
                    }
                />
            </div>
            <div
                style={{
                    width: "100%",
                    height: "calc(100vh - 105px)",
                    background: "#33333399",
                    overflow: "auto",
                    position: "relative",
                }}
            >
                {isUrlValid && hash !== undefined ? (
                    <iframe
                        id={new Date().getTime()}
                        title="token art tools viewer"
                        src={url + "?hash=" + hash}
                        width={resolution}
                        height={resolution}
                        style={{
                            border: 0,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
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
