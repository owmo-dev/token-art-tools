import React, { useState, useEffect } from "react";
import { Modal, Button, Progress } from "semantic-ui-react";

const RunAutomation = (props) => {
    const { count, wait, close } = props;
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    function cancel() {
        close();
    }

    useEffect(() => {
        setProgress((current / count) * 100);
        function automate() {
            setTimeout(function () {
                console.log("hello");
                setCurrent(current + 1);
                if (current < count) {
                    automate();
                } else {
                    close();
                }
            }, wait);
        }
        automate();
    }, []);

    return (
        <Modal size="tiny" open={props.active}>
            <Modal.Header>Generate Random Hash Images</Modal.Header>
            <Modal.Content>
                <Progress percent={progress} indicating />
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={cancel}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default RunAutomation;
