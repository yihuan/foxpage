import { ResponseBody } from '../common';

export interface LockerParams {
  applicationId: string;
  contentId: string;
  versionId: string;
}

export interface LockerResponse
  extends ResponseBody<
    Omit<LockerState, 'locked' | 'blocked' | 'preLocked' | 'needUpdate'> & {
      status: boolean;
      lockStatus: boolean;
    }
  > {}

export interface LockerUser {
  // Recent Operator Info
  id: string;
  account: string;
  email: string;
  nickName: string;
}

export type LockerState = {
  preLocked?: boolean;
  locked: boolean; // whether current content is locked by someone
  blocked: boolean; // whether current login-in user is blocked of locker
  operationTime: string; // recent updateTime
  operator?: LockerUser;
  needUpdate: boolean;
};

export interface LockerManagerState {
  noticeVisible: boolean;
}
