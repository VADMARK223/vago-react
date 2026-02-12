import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type KyResponse } from '@/shared/api/ky-client.ts';
import { QUERY_KEY, CODE, URL, ROUTE, MUTATION_KEY } from '@/shared/constants';
import { useNavigate } from 'react-router-dom';
import { ROLE, type Role } from '@/shared/constants';

export type AuthRedirectState = {
  from?: { pathname: string };
};

export function useSignInRedirect() {
  const navigate = useNavigate();

  return (targetPathname: string) => {
    const state: AuthRedirectState = {
      from: { pathname: targetPathname },
    };
    navigate(ROUTE.SIGN_IN, { state });
  };
}

export type User = {
  username: string;
  role: Role;
};

export type SignUpRole = Exclude<Role, 'admin'>;

type MeResponse = KyResponse<User>;

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignUpRequest = {
  login: string;
  password: string;
  username: string;
  role: SignUpRole;
};

export interface SignUpFormValues {
  [CODE.LOGIN]?: string;
  [CODE.PASSWORD]?: string;
  [CODE.USERNAME]?: string;
  [CODE.ROLE]: SignUpRole;
}

type SignInResponse = KyResponse;
export type SignUpResponse = KyResponse;

export const useMe = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ME],
    queryFn: async () => {
      const response = await api.get(URL.ME).json<MeResponse>();
      return response.data;
    },
    retry: false,
    // staleTime: Infinity,
    staleTime: 60_000, // 1 min
    refetchOnWindowFocus: false,
  });
};

export const useAuth = () => {
  const { data: me, isLoading, isError } = useMe();

  const isAuthed = !!me && !isError;
  const isAdmin = !!me?.role?.includes(ROLE.admin);
  const isModerator = !!me?.role?.includes(ROLE.moderator);

  return { me, isLoading, isAuthed, isAdminModerator: isAdmin || isModerator };
};

export const useSignInMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: MUTATION_KEY.SIGN_IN,
    mutationFn: signInRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.ME] }).then();
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUpRequest });
};

const signInRequest = async (data: SignInRequest) => {
  return api.post(URL.SIGN_IN, { json: data }).json<SignInResponse>();
};

const signUpRequest = async (data: SignUpRequest) => {
  return api.post(URL.SIGN_UP, { json: data }).json<SignUpResponse>();
};

export const toSignUpRequest = (values: SignUpFormValues): SignUpRequest => {
  const login = values[CODE.LOGIN];
  const password = values[CODE.PASSWORD];
  const username = values[CODE.USERNAME];
  const role = values[CODE.ROLE];

  if (!login || !password || !username) {
    throw new Error('Form values are incomplete');
  }

  return { login, password, username, role };
};
