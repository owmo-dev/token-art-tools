import React, { useState, useEffect } from "react";
import { Button, Modal, Progress, Icon } from "semantic-ui-react";

const RunAutomation = (props) => {
    const { active, progress, close, stop } = props;
    const [isSubmitting, setSubmitState] = useState(false);

    useEffect(() => {
        if (active) setSubmitState(false);
    }, [active]);

    useEffect(() => {
        if (progress === 100)
            setTimeout(() => {
                close();
            }, 1000);
    }, [progress, close]);

    return (
        <Modal size="tiny" open={active}>
            <Modal.Header>Running Automation</Modal.Header>
            <Modal.Content>
                <Progress percent={progress} indicating />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={() => {
                        setSubmitState(true);
                        stop();
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
