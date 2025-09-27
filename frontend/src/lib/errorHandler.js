import toast from 'react-hot-toast';

// Error types for better error handling
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error messages mapping
export const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Network connection failed. Please check your internet connection.',
  [ERROR_TYPES.AUTH]: 'Authentication failed. Please log in again.',
  [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
  [ERROR_TYPES.SERVER]: 'Server error occurred. Please try again later.',
  [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

// Determine error type based on error object
export const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;
  
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
    return ERROR_TYPES.NETWORK;
  }
  
  if (error.response?.status === 401 || error.response?.status === 403) {
    return ERROR_TYPES.AUTH;
  }
  
  if (error.response?.status === 400 || error.response?.status === 422) {
    return ERROR_TYPES.VALIDATION;
  }
  
  if (error.response?.status >= 500) {
    return ERROR_TYPES.SERVER;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

// Get user-friendly error message
export const getErrorMessage = (error) => {
  const errorType = getErrorType(error);
  
  // Try to get specific error message from response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Fallback to generic messages
  return ERROR_MESSAGES[errorType];
};

// Handle error with appropriate toast notification
export const handleError = (error, customMessage = null) => {
  const errorType = getErrorType(error);
  const message = customMessage || getErrorMessage(error);
  
  // Log error for debugging
  console.error('Error occurred:', {
    type: errorType,
    message,
    originalError: error
  });
  
  // Show appropriate toast
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
      toast.error(message, { duration: 5000 });
      break;
    case ERROR_TYPES.AUTH:
      toast.error(message, { duration: 4000 });
      break;
    case ERROR_TYPES.VALIDATION:
      toast.error(message, { duration: 3000 });
      break;
    case ERROR_TYPES.SERVER:
      toast.error(message, { duration: 5000 });
      break;
    default:
      toast.error(message, { duration: 4000 });
  }
  
  return { type: errorType, message };
};

// Retry mechanism for failed requests
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry for auth errors
      if (getErrorType(error) === ERROR_TYPES.AUTH) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Safe async wrapper for store actions
export const safeAsync = async (asyncFn, errorHandler = handleError) => {
  try {
    return await asyncFn();
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};
