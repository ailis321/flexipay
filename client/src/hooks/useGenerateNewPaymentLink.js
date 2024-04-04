import { useState } from 'react';

const useGenerateNewPaymentLink = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateError, setGenerateError] = useState(null);

    const generateNewPaymentLink = async (paymentIntentId) => {
        setIsGenerating(true);
        setGenerateError(null);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            if (!token) {
                throw new Error('Authorisation token not found');
            }

            const response = await fetch('/api/payment/generate-new-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorisation': `Bearer ${token}`, 
                },
                body: JSON.stringify({ paymentIntentId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate new payment link');
            }

            const responseData = await response.json();
            console.log('New payment link generated:', responseData);
            return responseData; 
        } catch (error) {
            setGenerateError(error.message);
            return null; 
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        isGenerating,
        generateError,
        generateNewPaymentLink
    };
};

export default useGenerateNewPaymentLink;
