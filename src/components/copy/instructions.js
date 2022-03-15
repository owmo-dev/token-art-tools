import React from 'react';
import {Segment, Header, Icon, Input} from 'semantic-ui-react';

const Instructions = () => {
    const script = '<script src="https://cdn.jsdelivr.net/gh/owenmoore/token-art-tools@1.6.5/lib/connector.js"></script>';
    const code = 'console.log(hash, number);';
    const boilerplate = 'https://github.com/owenmoore/token-art-tools-boilerplate';
    const localURL = 'https://127.0.0.1:8080';

    return (
        <Segment
            style={{
                width: '70%',
                minWidth: 450,
                maxWidth: 800,
                height: 480,
                padding: 40,
                top: 'calc(50% - 245px)',
                margin: 'auto',
                boxShadow: '0 3px 3px rgba(0,0,0,0.2)',
            }}
        >
            <Header as="h4">
                <Icon name="copy" style={{float: 'left'}} />
                include the connector.js script in your project
            </Header>

            <Input
                fluid
                action={{
                    color: 'blue',
                    icon: 'copy',
                    onClick: () => {
                        navigator.clipboard.writeText(script);
                    },
                }}
                value={script}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="code" style={{float: 'left'}} />
                use the global variables (hash &amp; number) in your script
            </Header>

            <Input
                fluid
                action={{
                    color: 'blue',
                    icon: 'copy',
                    onClick: () => {
                        navigator.clipboard.writeText(code);
                    },
                }}
                value={code}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="server" style={{float: 'left'}} />
                host your script via http(s) server, custom boilerplate setup is available:
            </Header>

            <Input
                fluid
                action={{
                    color: 'blue',
                    icon: 'external',
                    onClick: () => {
                        window.open(boilerplate);
                    },
                }}
                value={boilerplate}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="arrow circle up" style={{float: 'left'}} />
                enter the URL for your hosted work above
            </Header>

            <Input
                fluid
                action={{
                    color: 'blue',
                    icon: 'copy',
                    onClick: () => {
                        navigator.clipboard.writeText(localURL);
                    },
                }}
                value={localURL}
                readOnly={true}
            />

            <Header as="h4">
                <Icon name="github" style={{float: 'left'}} />
                see the README for{' '}
                <a href="https://github.com/owenmoore/token-art-tools" target="_blank" rel="noreferrer">
                    Token Art Tools on GitHub
                </a>{' '}
                for more detailed usage instructions
            </Header>
        </Segment>
    );
};

export default Instructions;
