import React from "react";
import { Header, Icon, Divider } from "semantic-ui-react";

const Title = () => {
    return (
        <>
            <Header as="h1" inverted>
                Token Art Tools
                <Header.Subheader>
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
            <Divider hidden />
        </>
    );
};

export default Title;
