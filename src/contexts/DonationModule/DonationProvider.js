import React, {useState} from 'react';
import DonationContext from './DonationContext';
import { toast } from 'react-toastify';
import { putOrder } from '../../lib/StitchFunctions';

const DonationProvider = props => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ 
        firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], dropoff: null, freeTextItems: [''] });


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
        setErrors({})
        setShowModal(true)
    };

    const submitDonation = async () => {
        // todo handle dropoff time validation
        setLoading(true);
        // format put request data
        const formattedData = formatRequest();
        const response = await putOrder(formattedData);
        setLoading(false);
        setErrors({})

        if(response.status === '200'){
            toast('Donation submitted successfully!')
            setFormData({firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], dropoff: null, freeTextItems: [''] })
            setStep(4)
            setShowModal(false)
        } else {
            if(response.status === '409'){
                setErrors({...errors, address: 'Address is not valid.'})
                toast('We could validate this address, please double check.');
            } else {
                if(response.message.indexOf('does not exist') > -1){
                    setErrors({...errors, address: 'Address is not valid.'})
                    toast('We could not validate this address, please double check.', {autoClose:10000});
                } else {
                    toast(response.message);
                }
            }
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
        body.items = [...formData.items.map(item => ({name: item.value, quantity: 1})), ...formData.freeTextItems.map(item => ({name: item, quantity: 1}))]
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
                setErrors: (obj) => setErrors(obj),
                setLoading: (bool) => setLoading(bool),
                setShowModal: (bool) => setShowModal(bool),
                setFormData: (data) => setFormData(data),
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