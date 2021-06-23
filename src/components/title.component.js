import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Title = () => {
    return (
        <Header as="h1" style={{ color: "white" }}>
            Token Art Tools
            <Header.Subheader style={{ color: "white" }}>
                created by
                <a href="https://www.ctrlshiftmake.com/" target="_blank" rel="noreferrer" style={{ marginLeft: 5 }}>
                    CtrlShiftMake
                </a>
                <a
                    href="https://github.com/ctrlshiftmake/token-art-tools"
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginLeft: 5 }}
                >
                    <Icon name="github" inverted link />
                </a>
            </Header.Subheader>
        </Header>
    );
};

export default Title;
