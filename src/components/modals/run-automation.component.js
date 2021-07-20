import React, { useEffect } from "react";
import { Modal, Progress } from "semantic-ui-react";

const RunAutomation = (props) => {
    const { progress, close } = props;

    useEffect(() => {
        if (progress === 100)
            setTimeout(() => {
                close();
            }, 1000);
    }, [progress, close]);

    return (
        <Modal size="tiny" open={props.active}>
            <Modal.Header>Generating Images</Modal.Header>
            <Modal.Content>
                <Progress percent={progress} indicating />
            </Modal.Content>
        </Modal>
    );
};

export default RunAutomation;
