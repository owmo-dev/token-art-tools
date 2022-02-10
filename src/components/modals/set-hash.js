import React, {useState} from 'react';
import {Modal, Form, Message, Button} from 'semantic-ui-react';
import {H_SET, useHash} from '../../hooks/useHash';

function isValidHash(str) {
    const regexExp = /^0x[a-f0-9]{64}$/gi;
    return regexExp.test(str);
}

const SetHash = props => {
    const [hash, hashAction] = useHash();

    const [isError, setErrorState] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitState] = useState(false);

    const {active, close} = props;

    const emptyFormData = {hash: '', number: ''};
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

        if (formData.hash === '' && formData.number === '') {
            setError('ERROR: To submit you must provide either an Edition number or Hash string (or both at once)');
            setErrorState(true);
            setSubmitState(false);
            return;
        }

        let h = formData.hash !== '' ? formData.hash : undefined;
        console.log(h);

        if (h) {
            if (!isValidHash(h)) {
                setError("ERROR: Hash string must be a valid 64 character hash, including '0x' at the start");
                setErrorState(true);
                setSubmitState(false);
                return;
            }
        }

        let n = formData.number !== '' ? Number(formData.number) : undefined;
        console.log(n);

        if (n) {
            if (n < hash.params.start || n > hash.params.editions || !Number.isInteger(n)) {
                setError(`ERROR: Edition number must be an integer within ${hash.params.start} and ${hash.params.editions}`);
                setErrorState(true);
                setSubmitState(false);
                return;
            }
        }

        hashAction({type: H_SET, hash: h, number: n});
        closeModal();
    }

    return (
        <Modal size="small" open={active} closeOnEscape={true}>
            <Modal.Header>Set an Edition and/or Hash (overrides locks)</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <Form.Input width={2} name="number" label="Edition" value={formData.number} onChange={onChange} />
                        <Form.Input width={14} name="hash" label="Hash" value={formData.hash} onChange={onChange} />
                    </Form.Group>
                </Form>
                {isError ? <Message error>{error}</Message> : null}
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
