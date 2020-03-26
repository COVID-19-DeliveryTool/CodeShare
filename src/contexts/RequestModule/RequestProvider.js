import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import RequestContext from './RequestContext';
import { toast } from 'react-toastify';
import { putOrder } from '../../lib/StitchFunctions';

const RequestProvider = props => {
    const { register, errors, clearError, handleSubmit } = useForm();
    const [showModal, setShowModal] = useState(false)
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], freeTextItems: [''], dropoff: null, householdNum: 0 });

    const stepOneIsValid = () => {
        if(!formData.firstName) return true
        if(!formData.lastName) return true
        if(!formData.phoneNumber || !formData.phoneNumber.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/g)) return true
        if(!formData.emailAddress) return true
        if(!formData.address) return true
        if(!formData.zipcode) return true
        if(!formData.householdNum || formData.householdNum === 0) return true
        return false
    }

    const stepTwoIsValid = () => {
        if(formData.items.length === 0) return true
        return false
    }

    const stepThreeIsValid = () => {
        if(!formData.dropoff) return true
        return false
    }

    const validateStep1 = (values) => {
        // todo handle address validation logic
        setStep(2)
    };

    const validateStep2 = () => {
        // todo handle requested item validation
        setStep(3)
    };

    const validateStep3 = async() => {
        setShowModal(true)
    }

    const submitRequest = async() => {
        // todo handle dropoff time validation
        setLoading(true);
        // format put request data
        const formattedData = formatRequest();
        const response = await putOrder(formattedData);
        setLoading(false);
        if(response && !response.errorCode && response.status === '200'){
            toast('Request submitted successfully!')
            setStep(4)
        } else {
            toast(response.message);
        }
    };

    const formatRequest = () => {
        // todo write logic to format the request object to match the data model given by backend
        const body = {};
        body.firstName = formData.firstName;
        body.lastName = formData.lastName;
        body.address = formData.address;
        body.emailAddress = formData.emailAddress;
        body.phoneNumber =  formData.phoneNumber;
        body.zipcode = formData.zipcode;
        body.time = formData.dropoff.id;
        body.type = 'REQUEST';
        body.items = formData.items.map(item => ({name: item.value, quantity: 1}));
        body.additionalInfo = formData.additionalInfo;
        body.householdNum = formData.householdNum;
        return body; 
    };

    return (
        <RequestContext.Provider 
            value={{
                state: {
                    step, // shorthand for step: step
                    loading,
                    showModal,
                    formData,
                    errors
                    // state values you want to expose go here
                },
                setStep: (num) => setStep(num),
                setLoading: (bool) => setLoading(bool),
                setFormData: (data) => setFormData(data),
                setShowModal: (bool) => setShowModal(bool),
                register: () => register(),
                clearError: () => clearError(),
                handleSubmit: (e) => handleSubmit(e),
                validateStep1: () => validateStep1(),
                stepOneIsValid: () => stepOneIsValid(),
                stepTwoIsValid: () => stepTwoIsValid(),
                stepThreeIsValid: () => stepThreeIsValid(),
                validateStep2: () => validateStep2(),
                validateStep3: () => validateStep3(), 
                submitRequest: () => submitRequest()
                // functions you want to expose go here
            }}
        >
            {props.children}
        </RequestContext.Provider>
    )
};

export default RequestProvider;