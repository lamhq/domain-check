import axios from 'axios';
import type { SignInFormData } from './organisms/SignInForm';

export type SignInResponse = {
  user: {
    id: string;
    email: string;
  };
};

export type ApiError = {
  message: string;
};

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

const isSignInResponse = (data: unknown): data is SignInResponse => {
  if (typeof data !== 'object' || data === null) return false;

  return 'user' in data;
};

export const signInMutation = async (
  data: SignInFormData,
): Promise<SignInResponse> => {
  try {
    const { data: responseData } = await axios.post<SignInResponse>(
      '/api/auth/access-tokens',
      data,
    );

    if (!isSignInResponse(responseData)) {
      throw new Error('Invalid response format');
    }

    return responseData;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isApiError(error.response.data)
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to sign in');
  }
};
