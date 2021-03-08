import { FC } from 'react';
import { IncomingMessage } from 'http';
import { GenericObject, SessionBase  } from './_utils';

type Session = SessionBase & GenericObject;

interface GetProvidersResponse {
    [provider: string]: SessionProvider;
}

interface SessionProvider extends GenericObject {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
}

interface ContextProviderProps {
    session: Session | null | undefined;
    options?: SetOptionsParams;
}

interface SetOptionsParams {
    baseUrl?: string;
    basePath?: string;
    clientMaxAge?: number;
    keepAlive?: number;
}

interface CredentialsSignInReturn {
    error: string | undefined;
    status: number;
    ok: boolean;
    url: string | null;
}

type SignInDataParams = GenericObject & {
  callbackUrl?: string;
};

type ContextProvider = FC<ContextProviderProps>;

interface NextContext {
    req?: IncomingMessage;
    ctx?: { req: IncomingMessage };
}

declare function useSession(): [Session | null | undefined, boolean];
declare function providers(): Promise<GetProvidersResponse | null>;
declare const getProviders: typeof providers;
declare function session(
    context?: NextContext & {
        triggerEvent?: boolean;
    },
): Promise<Session | null>;
declare const getSession: typeof session;
declare function csrfToken(context?: NextContext): Promise<string | null>;
declare const getCsrfToken: typeof csrfToken;
declare function signin(
    provider?: string,
    data?: SignInDataParams,
    authorizationParams?: string | string[][] | GenericObject | URLSearchParams
): Promise<void>;
declare function signin(
  provider: 'credentials',
  data?: SignInDataParams,
  authorizationParams?: string | string[][] | GenericObject | URLSearchParams
): Promise<CredentialsSignInReturn>;
declare const signIn: typeof signin;
declare function signout(data?: { callbackUrl?: string, redirect?: boolean }): Promise<void>;
declare const signOut: typeof signout;
declare function options(options: SetOptionsParams): void;
declare const setOptions: typeof options;
declare const Provider: ContextProvider;

export {
    useSession,
    session,
    getSession,
    providers,
    getProviders,
    csrfToken,
    getCsrfToken,
    signin,
    signIn,
    signout,
    signOut,
    options,
    setOptions,
    Provider,
    Session,
    SessionProvider,
};
