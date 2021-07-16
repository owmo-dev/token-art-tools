import React, { useState, useEffect } from "react";
import { Input, Button, Icon, Dropdown } from "semantic-ui-react";

import SetResolution from "./modals/set-resolution.component";
import Instructions from "./copy/instructions.component";

const Viewer = (props) => {
    const [url, setUrl] = useState("");
    const [isUrlValid, setUrlValid] = useState(false);
    const [iKey, setKey] = useState(0);

    const [resolutionValue, setResolutionValue] = useState("fill");
    const [iframeResolution, setIFrameResolution] = useState({ x: "100%", y: "100%" });

    const { hash } = props;

    function onChange(e) {
        if (url === e.target.value) return;
        setUrl(e.target.value);
        var valid = isValidHttpUrl(e.target.value);
        setUrlValid(valid);
        if (!valid) {
            setResolutionValue("fill");
        }
    }

    function handleClearURL() {
        setUrl("");
        setUrlValid(false);
    }

    const resolutionOptions = [
        {
            key: "fill",
            text: "Fill Space",
            value: "fill",
        },
        {
            key: "half",
            text: "Half Size Preview",
            value: "half",
        },
        {
            key: "custom",
            text: "Custom Resolution",
            value: "custom",
        },
    ];

    function handleChange(e, d) {
        setResolutionValue(d.value);
    }

    function refresh() {
        setKey(iKey + 1);
    }

    useEffect(() => {
        switch (resolutionValue) {
            case "custom":
                openResolutionModal();
                break;
            case "half":
                setIFrameResolution({ x: "50%", y: "50%" });
                break;
            default:
            case "fill":
                setIFrameResolution({ x: "100%", y: "100%" });
                break;
        }
        refresh();
    }, [resolutionValue]);

    const [isResolutionModalOpen, setResolutionModalState] = useState(false);

    function openResolutionModal() {
        setResolutionModalState(true);
    }

    function closeResolutionModal(isCancel) {
        setResolutionModalState(false);
        if (isCancel) setResolutionValue("fill");
    }

    function setRes(x, y) {
        setIFrameResolution({
            x: x + 2 + "px",
            y: y + 2 + "px",
        });
        refresh();
    }

    return (
        <>
            <SetResolution active={isResolutionModalOpen} close={closeResolutionModal} set={setRes} />
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
                    onClick={refresh}
                >
                    <Icon name="refresh" />
                </Button>
                <Dropdown
                    selection
                    placeholder="Fit Available Space"
                    disabled={!isUrlValid}
                    options={resolutionOptions}
                    value={resolutionValue}
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
                                    setResolutionValue("fill");
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
                    position: "relative",
                    border: "1px solid #00000044",
                }}
            >
                <Button
                    icon
                    inverted
                    disabled={!isUrlValid}
                    size="mini"
                    onClick={() => {
                        var iframe = window.document.querySelector("iframe");
                        const w = iframe.clientWidth;
                        const h = iframe.clientHeight;
                        window.open(url + "?hash=" + hash, "", `top=100, width=${w}, height=${h}`);
                    }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        marginBottom: 10,
                        marginRight: 10,
                        zIndex: 1000,
                        opacity: "0.5",
                    }}
                >
                    <Icon name="external" />
                </Button>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        position: "relative",
                    }}
                >
                    {isUrlValid && hash !== undefined ? (
                        <iframe
                            id={new Date().getTime()}
                            title="token art tools viewer"
                            src={url + "?hash=" + hash}
                            width={iframeResolution.x}
                            height={iframeResolution.y}
                            style={{
                                border: "1px dashed #99999933",
                                position: "absolute",
                            }}
                            key={iKey}
                        />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: "#555", overflow: "auto" }}>
                            <Instructions />
                        </div>
                    )}
                </div>
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
