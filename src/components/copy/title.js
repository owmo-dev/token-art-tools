import React from 'react';
import {Header, Icon} from 'semantic-ui-react';

const Title = () => {
    return (
        <Header as="h1" style={{color: 'white'}}>
            Token Art Tools
            <Header.Subheader style={{color: 'white'}}>
                created by
                <a href="https://www.owenmoore.xyz/" target="_blank" rel="noreferrer" style={{marginLeft: 5, color: 'white', fontWeight: 'bold'}}>
                    Owen Moore
                </a>
                <a href="https://github.com/owenmoore/token-art-tools" target="_blank" rel="noreferrer" style={{marginLeft: 5}}>
                    <Icon name="github" inverted link />
                </a>
            </Header.Subheader>
        </Header>
    );
};

export default Title;
