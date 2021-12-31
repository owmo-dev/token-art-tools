import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import '../css/style.css';

import {HashProvider} from '../hooks/useHash';

import App from './app';

const Main = () => {
    return (
        <HashProvider>
            <App />
        </HashProvider>
    );
};

export default Main;
