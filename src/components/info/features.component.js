import React, { useEffect, useState } from "react";
import { List, Header, Loader } from "semantic-ui-react";

const Features = (props) => {
    const { hash, isValidUrl, iFrameKey, features, setFeatures } = props;
    const [isLoading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        window.addEventListener("message", (e) => {
            switch (e.data["command"]) {
                case "loadFeatures":
                    setFeatures(e.data["features"]);
                    break;
                default:
                    break;
            }
        });
    }, []);

    useEffect(() => {
        setFeatures({});
        if (!isValidUrl) {
            setList([]);
            return;
        }

        setLoading(true);

        let timerGet = setTimeout(() => {
            var iframe = window.document.querySelector("iframe").contentWindow;
            if (iframe === undefined) return;
            iframe.postMessage({ command: "getFeatures" }, "*");
        }, 500);

        let timerTimeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timerGet);
            clearTimeout(timerTimeout);
        };
    }, [hash, isValidUrl, iFrameKey]);

    useEffect(() => {
        setList(
            Object.keys(features).map((key) => {
                return (
                    <List.Item key={key}>
                        <Header as="h3">
                            {features[key]}
                            <Header.Subheader style={{ marginTop: 3, etterSpacing: 1 }}>[ {key} ]</Header.Subheader>
                        </Header>
                    </List.Item>
                );
            })
        );
    }, [features]);

    const example = `features = { Feature: "Value of Feature"}`;

    return (
        <div
            style={{
                height: "100%",
                position: "relative",
                overflowX: "auto",
                whiteSpace: "nowrap",
                userSelect: "none",
            }}
        >
            <center>
                {!isValidUrl ? (
                    <Header as="h4" inverted style={{ marginTop: 20 }}>
                        Features will display if you assign the global variable:
                        <Header.Subheader style={{ marginTop: 6, font: "monospace" }}>{example}</Header.Subheader>
                    </Header>
                ) : isValidUrl && list.length === 0 ? (
                    isLoading ? (
                        <Loader active />
                    ) : (
                        <div style={{ font: "monospace", marginTop: 30, color: "#999" }}>no features found</div>
                    )
                ) : (
                    <List horizontal inverted relaxed size="mini" style={{ margin: "13px 30px 0px 30px" }}>
                        {list}
                    </List>
                )}
            </center>
        </div>
    );
};

export default Features;
