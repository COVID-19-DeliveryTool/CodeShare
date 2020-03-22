import React, {useState} from 'react';
import DonationContext from './DonationContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { putOrder } from '../../lib/StitchFunctions';

const DonationProvider = props => {
    var { register, errors, clearError, handleSubmit } = useForm();
    const [step, setStep] = useState(1);
    var [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        firstName: '', lastName: '', phoneNumber: '', emailAddress: '', additionalInfo: '', address: '', zipcode: '', items: [], dropoff: null });

    const validateStep1 = () => {
        console.log('forData ', formData);
        // todo handle address validation logic
        setStep(2)
    };

    const validateStep2 = () => {
        // todo handle requested item validation
        setStep(3);
    };

    const validateStep3 = async () => {
        // todo handle dropoff time validation
        setLoading(true);
        // format put request data
        const formattedData = formatRequest();
        const response = await putOrder(formattedData);
        setLoading(false);
        if(response && !response.errorCode){
            toast('Request submitted successfully!')
            setStep(1)
        } else {
            toast('There was an error submitting your request.');
        }
    };

    const formatRequest = () => {
        // todo write logic to format the request object to match the data model given by backend
        const body = {};
        body.firstName = formData.firstName;
        body.lastName = formData.lastName;
        body.address = formData.address;
        body.phoneNumber =  formData.phoneNumber;
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
                    formData,
                    errors
                },
                // put functions you want to expose here
                setStep: (num) => setStep(num),
                setLoading: (bool) => setLoading(bool),
                setFormData: (data) => setFormData(data),
                register: () => register(),
                clearError: () => clearError(),
                handleSubmit: (e) => handleSubmit(e),
                validateStep1: () => validateStep1(),
                validateStep2: () => validateStep2(),
                validateStep3: () => validateStep3() 
            }}
        >
            {props.children}
        </DonationContext.Provider>
    )
}

export default DonationProvider;