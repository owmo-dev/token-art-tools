import React from "react";
import { Segment, Header, Icon, Divider, Message } from "semantic-ui-react";

const Waiting = () => {
    return (
        <Segment
            style={{
                width: 500,
                height: 190,
                padding: 40,
                top: "calc(50% - 95px)",
                margin: "auto",
                boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
            }}
        >
            <Header as="h2">
                <Icon name="search" style={{ float: "right" }} />
                Enter your localhost URL above
            </Header>
            <Message info>
                Host your artwork script via local http server and enter the URL above. View the GitHub repository for
                more information.
            </Message>
        </Segment>
    );
};

export default Waiting;
