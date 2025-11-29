import { useState, useEffect } from 'react';
import { healthCheck, testAuth } from '../utils/api';

export const useApi = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const health = await healthCheck();
        const authTest = await testAuth();
        
        setBackendData({
          health,
          authTest,
          connected: true
        });
        setApiStatus('connected');
      } catch (error) {
        console.error('Backend connection failed:', error);
        setApiStatus('disconnected');
      }
    };

    checkBackend();
  }, []);

  return { apiStatus, backendData };
};
