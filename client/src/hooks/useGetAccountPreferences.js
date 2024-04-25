import { useState, useEffect } from 'react';

const useGetAccountPreferences = (token) => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferencesFound, setPreferencesFound] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      setError(null);
      setPreferencesFound(true); 

      try {
        const response = await fetch('/api/organisations/get-preferences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch preferences, status: ${response.status}`);
        }

        const data = await response.json();
        if (data.preferencesFound === false) {
          setPreferencesFound(false);
          setPreferences(null); 
        } else {
          setPreferences(data.preferences);
          setPreferencesFound(true);
  
        }
      } catch (err) {
        setError(err.message);
        setPreferencesFound(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPreferences();
    }
  }, [token]);

  return { preferences, loading, error, preferencesFound };
};

export default useGetAccountPreferences;
