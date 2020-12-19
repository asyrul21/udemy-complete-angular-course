import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export const LOGIN_START = '[Auth] LOGIN_START';
export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE FAIL';
export class AuthentucateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export const SIGNUP_START = '[Auth] SIGN UP START';
export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export const CLEAR_ERROR = '[Auth] CLEAR ERROR';
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export const AUTO_LOGIN = '[Auth] AUTO LOGIN';
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthentucateFail
  | SignupStart
  | ClearError
  | AutoLogin;
