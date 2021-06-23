import React from "react";
import { Segment, Header, Icon, Message, Input } from "semantic-ui-react";

const Usage = () => {
    const script =
        '<script src="https://cdn.jsdelivr.net/gh/ctrlshiftmake/token-art-tools@main/providers/artblocks.js"></script>';
    const localhost = "python -m http.server 5500";
    const localURL = "http://127.0.0.1:5500";

    return (
        <Segment
            style={{
                width: 500,
                height: 350,
                padding: 40,
                top: "calc(50% - 175px)",
                margin: "auto",
                boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
            }}
        >
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

export default Usage;
