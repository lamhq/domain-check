import axios from 'axios';
import { isApiError } from '../common/api';
import type { SignInFormData } from './organisms/SignInForm';

export type SignInResponse = {
  user: {
    id: string;
    email: string;
  };
};

export async function signInMutation(data: SignInFormData): Promise<SignInResponse> {
  try {
    const response = await axios.post<SignInResponse>(
      '/api/auth/access-tokens',
      data,
    );

    return response.data;
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
}
