import React from 'react';

import {HashProvider} from '../hooks/useHash';
import App from '../containers/app.container';

const Index = () => {
    return (
        <HashProvider>
            <App />
        </HashProvider>
    );
};

export default Index;
