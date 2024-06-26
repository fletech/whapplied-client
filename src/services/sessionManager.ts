import { ISessionManager, ISessionState } from "../types/interfaces";

export class SessionManager implements ISessionManager {
  private state: ISessionState = {
    isLoggedIn: false,
    user: null,
  };

  getState(): ISessionState {
    return this.state;
  }

  setState(newState: Partial<ISessionState>): void {
    this.state = { ...this.state, ...newState };
  }
}
