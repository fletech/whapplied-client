export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  accessToken: string;
  spreadSheetId: string;
}

export interface IAuthService {
  login(): void;
  logout(): Promise<void>;
  checkAuthStatus(): Promise<IUser | null>;
}

export interface ISessionState {
  user: IUser | null;
}

export interface ISessionContext {
  sessionState: ISessionState;
  updateSessionState(newState: Partial<ISessionState>): void | null;
}

export interface IStatusOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
}
