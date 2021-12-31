import React from 'react';

import Viewer from '../components/panels/viewer';
import Controls from '../components/panels/controls';

import 'semantic-ui-css/semantic.min.css';
import '../css/style.css';

import {HashProvider} from '../hooks/useHash';
import {URLProvider} from '../hooks/useURL';
import {FeaturesProvider} from '../hooks/useFeatures';
import {AutomationProvider} from '../hooks/useAutomation';

const App = () => {
    return (
        <URLProvider>
            <HashProvider>
                <FeaturesProvider>
                    <AutomationProvider>
                        <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                            <div style={{width: 480, position: 'absolute', top: 20, left: 20}}>
                                <Controls />
                            </div>
                            <div
                                style={{
                                    marginLeft: 500,
                                    padding: 20,
                                    height: '100vh',
                                    width: 'auto',
                                    minWidth: 800,
                                }}
                            >
                                <Viewer />
                            </div>
                        </div>
                    </AutomationProvider>
                </FeaturesProvider>
            </HashProvider>
        </URLProvider>
    );
};

export default App;
