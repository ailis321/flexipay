import { useState, useEffect } from 'react';

const useGetProfileInfo = (token) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch('api/organisations/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.error || 'Failed to retrieve profile information');
        }

        const responseData = await response.json();
        setProfileInfo(responseData);
        console.log('Profile info received', responseData);
      } catch (err) {
        console.error('Error retrieving profile info:', err);
        setError(err.message || 'An error occurred while retrieving profile information');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfileInfo();
    } else {
      setLoading(false);
    }
  }, [token]); 

  return { profileInfo, loading, error };
};

export default useGetProfileInfo;
