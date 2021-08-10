import React from "react";
import { List, Header } from "semantic-ui-react";

const Features = () => {
    return (
        <div style={{ height: "100%", overflowX: "auto", whiteSpace: "nowrap", userSelect: "none" }}>
            <center>
                <List horizontal inverted relaxed size="mini" style={{ margin: "13px 30px 0px 30px" }}>
                    <List.Item>
                        <Header as="h3">
                            Berserker
                            <Header.Subheader style={{ marginTop: 3, etterSpacing: 1 }} content="[ Class ]" />
                        </Header>
                    </List.Item>
                    <List.Item>
                        <Header as="h3">
                            High
                            <Header.Subheader style={{ marginTop: 3, letterSpacing: 1 }} content="[ Cost ]" />
                        </Header>
                    </List.Item>
                    <List.Item>
                        <Header as="h3">
                            Apprentice
                            <Header.Subheader style={{ marginTop: 3, letterSpacing: 1 }} content="[ Class ]" />
                        </Header>
                    </List.Item>
                    <List.Item>
                        <Header as="h3">
                            Power
                            <Header.Subheader style={{ marginTop: 3, letterSpacing: 1 }} content="[ Manifestation ]" />
                        </Header>
                    </List.Item>
                </List>
            </center>
        </div>
    );
};

export default Features;
