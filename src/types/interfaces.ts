export interface IRowDetails {
  shownContent: {
    date_applied: number;
    company: string;
    position: string;
    location: string;
    status: string;
    stage: number;
  };
  hiddenContent: {
    id: string;
    url: string;
    logs: JSON;
    description: string;
    rawDates: {
      rawDateApplied: number;
      rawDateSaved: number;
    };
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  accessToken: string;
  spreadSheetId: string;
}

export interface ITable {
  shownContent: {
    date_applied: number;
    company: string;
    position: string;
    location: string;
    status: string;
    stage: number;
  };
  hiddenContent: {
    id: string;
    url: string;
    logs: JSON;
    description: string;
    rawDates: {
      rawDateApplied: number;
      rawDateSaved: number;
    };
  };
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

export interface ITableData {
  data: ITable | null;
}

export interface ITableContext {
  tableData: ITableData | null;
  updateTableState(newState: Partial<ITableData>): void | null;
}
