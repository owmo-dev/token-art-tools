import React from "react";
import { Segment, Header, Icon, Input, Message } from "semantic-ui-react";

const Instructions = () => {
    const script =
        '<script src="https://cdn.jsdelivr.net/gh/owenmoore/token-art-tools@main/providers/artblocks.js"></script>';
    const code = "var hash = tokenData.hash;";
    const localhost = "python -m http.server 5500";
    const localURL = "http://127.0.0.1:5500";

    return (
        <Segment
            style={{
                width: "70%",
                minWidth: 450,
                maxWidth: 800,
                height: 540,
                padding: 40,
                top: "calc(50% - 275px)",
                margin: "auto",
                boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
            }}
        >
            <Message warning>
                <Message.Header>Update your CDN script URL</Message.Header>
                This repository / hosting has moved; please update the script tag in your projects.
            </Message>

            <Header as="h4">
                <Icon name="copy" style={{ float: "left" }} />
                copy/paste this into your index.html header
            </Header>

            <Input
                fluid
                action={{
                    color: "blue",
                    icon: "copy",
                    onClick: () => {
                        navigator.clipboard.writeText(script);
                    },
                }}
                value={script}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="code" style={{ float: "left" }} />
                Use the hash provided by the token in your script
            </Header>

            <Input
                fluid
                action={{
                    color: "blue",
                    icon: "copy",
                    onClick: () => {
                        navigator.clipboard.writeText(code);
                    },
                }}
                value={code}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="server" style={{ float: "left" }} />
                host your script via local http server
            </Header>

            <Input
                fluid
                action={{
                    color: "blue",
                    icon: "copy",
                    onClick: () => {
                        navigator.clipboard.writeText(localhost);
                    },
                }}
                value={localhost}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="arrow circle up" style={{ float: "left" }} />
                enter the localhost URL at the top of the page
            </Header>

            <Input
                fluid
                action={{
                    color: "blue",
                    icon: "copy",
                    onClick: () => {
                        navigator.clipboard.writeText(localURL);
                    },
                }}
                value={localURL}
                readOnly={true}
            />
        </Segment>
    );
};

export default Instructions;
