import React, {useState} from 'react';
import RequestContext from './RequestContext';
import { toast } from 'react-toastify';
import { putOrder } from '../../lib/StitchFunctions';

const RequestProvider = props => {
    const [errors, setErrors] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], freeTextItems: [''], dropoff: null, householdNum: 1 })

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
        var valid = true
        var validationErrors = {...errors}

        if((!formData.firstName || formData.firstName == '' || !formData.firstName.match(/[a-z,A-Z]/gi))){
            if(!errors.firstName) validationErrors.firstName=true
            valid = false
        } else {
            if(errors.firstName) validationErrors.firstName = false
        }

        if((!formData.lastName || formData.lastName == '' || !formData.lastName.match(/[a-z,A-Z]/gi))){
            if(!errors.lastName) validationErrors.lastName=true
            valid = false
        } else {
            if(errors.lastName) validationErrors.lastName = false
        }

        if((!formData.phoneNumber || formData.phoneNumber == '' || !formData.phoneNumber.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/g))){
            if(!errors.phoneNumber) validationErrors.phoneNumber=true
            valid = false
        } else {
            if(errors.phoneNumber) validationErrors.phoneNumber = false
        }

        if((!formData.emailAddress || formData.emailAddress == '' || !formData.emailAddress.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g))){
            if(!errors.emailAddress) validationErrors.emailAddress=true
            valid = false
        } else {
            if(errors.emailAddress) validationErrors.emailAddress = false
        }

        if((!formData.address || formData.address == '' || !formData.address.match(/\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/g))){
            if(!errors.address) validationErrors.address=true
            valid = false
        } else {
            if(errors.address) validationErrors.address = false
        }

        if((!formData.zipcode || formData.zipcode == '' || !formData.zipcode.match(/^^\d{5}$/g))){
            if(!errors.zipcode) validationErrors.zipcode=true
            valid = false
        } else {
            if(errors.zipcode) validationErrors.zipcode = false
        }

        setErrors(validationErrors)
        if(valid) setStep(2)
    };

    const validateStep2 = () => {
        // todo handle requested item validation
        setStep(3)
    };

    const validateStep3 = async() => {
        setErrors({})
        setShowModal(true)
    }

    const submitRequest = async(values) => {
        console.log(values)
        // todo handle dropoff time validation
        setLoading(true);
        // format put request data
        const formattedData = formatRequest();
        const response = await putOrder(formattedData);
        setLoading(false);
        setErrors({})

        if(response.status === '200'){
            toast('Request submitted successfully!')
            setFormData({ 
                firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], freeTextItems: [''], dropoff: null, householdNum: 0 })
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
        body.items = [...formData.items.map(item => ({name: item.value, quantity: 1})), ...formData.freeTextItems.map(item => ({name: item, quantity: 1}))]
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
                setErrors: (obj) => setErrors(obj),
                setLoading: (bool) => setLoading(bool),
                setFormData: (data) => setFormData(data),
                setShowModal: (bool) => setShowModal(bool),
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