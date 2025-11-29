const API_BASE_URL = 'http://localhost:5002/api';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (response.status < 200 || response.status >= 300) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const healthCheck = () => apiCall('/health');
export const testAuth = () => apiCall('/auth/test');
