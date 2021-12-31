import React, {useState} from 'react';
import {Button, Modal, Progress, Icon} from 'semantic-ui-react';

import {useAutomation} from '../../hooks/useAutomation';

const RunAutomation = () => {
    const [automation, automationAction] = useAutomation();

    const msg_gen = 'Generating Hashes';
    const msg_fin = 'Finishing Export';

    const [isSubmitting, setSubmitState] = useState(false);
    const [message, setMessage] = useState(msg_gen);

    /*
    useEffect(() => {
        if (active) {
            setMessage(msg_gen);
            setSubmitState(false);
        }
    }, [active]);
    
    useEffect(() => {
        if (progress === 100) {
            setMessage(msg_fin);
            setTimeout(() => {
                close();
            }, 2000);
        }
    }, [progress, close]);
    */

    return (
        <Modal size="tiny" open={automation.status === 'active'}>
            <Modal.Header>Running Automation</Modal.Header>
            <Modal.Content>
                <Progress percent={automation.progress} progress indicating>
                    {message}
                </Progress>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={() => {
                        setSubmitState(true);
                        setMessage(msg_fin);
                        automationAction({type: 'stop'});
                    }}
                >
                    <Icon name="cancel" />
                    Stop
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default RunAutomation;
