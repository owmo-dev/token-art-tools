import React from "react";
import { Segment, Header, Icon, Divider, Message } from "semantic-ui-react";

const Waiting = () => {
    return (
        <Segment
            style={{
                width: 500,
                height: 320,
                padding: 40,
                top: "calc(50% - 160px)",
                margin: "auto",
                boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
            }}
        >
            <Header as="h2">
                <Icon name="search" style={{ float: "right" }} />
                Enter your localhost URL above
            </Header>
            <Message info>
                <p style={{ marginBottom: 20 }}>
                    Host your artwork script using a local http(s) server and enter the URL above. For example, the
                    following command...
                </p>
                <span
                    style={{
                        fontFamily: "monospace",
                        background: "#555",
                        color: "white",
                        padding: 8,
                        borderRadius: 2,
                    }}
                >
                    python -m http.server 5500
                </span>
                <p style={{ marginBottom: 20, marginTop: 20 }}>
                    ...will serve an
                    <span
                        style={{
                            fontFamily: "monospace",
                            color: "#094270",
                            marginLeft: 4,
                            marginRight: 4,
                        }}
                    >
                        index.html
                    </span>
                    file at this URL.
                </p>
                <span
                    style={{
                        fontFamily: "monospace",
                        background: "#555",
                        color: "white",
                        padding: 8,
                        borderRadius: 2,
                    }}
                >
                    http://localhost:5500
                </span>
                <Divider hidden clearing />
            </Message>
        </Segment>
    );
};

export default Waiting;
