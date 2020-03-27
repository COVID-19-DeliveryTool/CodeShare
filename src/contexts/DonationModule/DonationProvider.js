import React, {useState} from 'react';
import DonationContext from './DonationContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { putOrder } from '../../lib/StitchFunctions';

const DonationProvider = props => {
    var { register, errors, clearError, handleSubmit } = useForm();
    const [step, setStep] = useState(1);
    var [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ 
        firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], dropoff: null });


    const stepOneIsValid = () => {
        if(!formData.firstName) return true
        if(!formData.lastName) return true
        if(!formData.phoneNumber || !formData.phoneNumber.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/g)) return true
        if(!formData.emailAddress) return true
        if(!formData.address) return true
        if(!formData.zipcode) return true
        return false
    }

    const stepTwoIsValid = () => {
        if(!formData.items || (formData.items && formData.items.length === 0)) return true
        return false
    }

    const stepThreeIsValid = () => {
        if(!formData.dropoff) return true
        return false
    }

    const validateStep1 = () => {
        // todo handle address validation logic
        setStep(2)
    };

    const validateStep2 = () => {
        // todo handle requested item validation
        setStep(3);
    };

    const validateStep3 = async () => {
        setShowModal(true)
    };

    const submitDonation = async () => {
        // todo handle dropoff time validation
        setLoading(true);
        // format put request data
        const formattedData = formatRequest();
        const response = await putOrder(formattedData);
        setLoading(false);
        if(response.status === '200'){
            toast('Donation submitted successfully!')
            setStep(4)
            setShowModal(false)
        } else {
            toast(response.message);
        }
    }

    const formatRequest = () => {
        // todo write logic to format the request object to match the data model given by backend
        const body = {};
        body.firstName = formData.firstName;
        body.lastName = formData.lastName;
        body.address = formData.address;
        body.phoneNumber =  formData.phoneNumber;
        body.emailAddress = formData.emailAddress;
        body.zipcode = formData.zipcode;
        body.time = formData.dropoff.id;
        body.type = 'DONATION';
        body.items = formData.items.map(item => ({name: item.value, quantity: 1}));
        body.additionalInfo =formData.additionalInfo;
        return body;
    };

    return(
        <DonationContext.Provider
            value={{
                state: {
                    // put state values here
                    step, // shorthand for step: step
                    loading,
                    showModal,
                    formData,
                    errors
                },
                // put functions you want to expose here
                setStep: (num) => setStep(num),
                setLoading: (bool) => setLoading(bool),
                setShowModal: (bool) => setShowModal(bool),
                setFormData: (data) => setFormData(data),
                register: () => register(),
                clearError: () => clearError(),
                handleSubmit: (e) => handleSubmit(e),
                stepOneIsValid: () => stepOneIsValid(),
                stepTwoIsValid: () => stepTwoIsValid(),
                stepThreeIsValid: () => stepThreeIsValid(),
                validateStep1: () => validateStep1(),
                validateStep2: () => validateStep2(),
                validateStep3: () => validateStep3(),
                submitDonation: () =>  submitDonation()
            }}
        >
            {props.children}
        </DonationContext.Provider>
    )
}

export default DonationProvider;