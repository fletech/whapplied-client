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
  isLoggedIn: boolean;
  user: IUser | null;
}

export interface ISessionManager {
  getState(): ISessionState;
  setState(newState: Partial<ISessionState>): void;
}
