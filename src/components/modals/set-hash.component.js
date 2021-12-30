import React, {useState} from 'react';
import {Modal, Form, Message, Button} from 'semantic-ui-react';

function isValidHash(str) {
    const regexExp = /^0x[a-f0-9]{64}$/gi;
    return regexExp.test(str);
}

const SetHash = props => {
    const [isError, setErrorState] = useState(false);
    const [isSubmitting, setSubmitState] = useState(false);

    const {active, close, setHashValues} = props;

    const emptyFormData = {hash: ''};
    const [formData, setFormData] = useState(emptyFormData);

    function onChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function cancel() {
        closeModal(true);
    }

    function closeModal() {
        setErrorState(false);
        setSubmitState(false);
        setFormData(emptyFormData);
        close();
    }

    function handleSubmit() {
        setErrorState(false);
        setSubmitState(true);

        if (!isValidHash(formData.hash)) {
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        setHashValues(formData.hash);
        closeModal();
    }

    return (
        <Modal size="small" open={active} closeOnEscape={true}>
            <Modal.Header>Enter Hash</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input fluid name="hash" label="Hash (overrides locks)" value={formData.hash} onChange={onChange} />
                </Form>
                {isError ? <Message error>ERROR: must be a valid 64 character hash, including '0x' at the start</Message> : null}
            </Modal.Content>
            <Modal.Actions>
                <Button secondary disabled={isSubmitting} onClick={cancel}>
                    Cancel
                </Button>
                <Button primary loading={isSubmitting} disabled={isSubmitting} onClick={handleSubmit}>
                    OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default SetHash;
