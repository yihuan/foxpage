import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as ACTIONS from '@/actions/workspace/projects/personal/file';
import * as AUTH_API from '@/apis/authorize';
import * as API from '@/apis/project';
import { updateBlock, addBlock } from '@/apis/builder/block';
import { defaultSuffix, FileType } from '@/constants/index';
import { getBusinessI18n } from '@/foxI18n/index';
import { ProjectFileActionType } from '@/reducers/workspace/projects/personal/file';
import { store } from '@/store/index';
import {
  AuthorizeAddParams,
  AuthorizeDeleteParams,
  AuthorizeListFetchParams,
  AuthorizeUserFetchParams,
  ParentFileFetchParams,
  ProjectFileDeleteParams,
  ProjectFileFetchParams,
  ProjectFileSaveParams,
} from '@/types/index';

function* handleFetchList(action: ProjectFileActionType) {
  yield put(ACTIONS.updateLoading(true));

  const { params } = action.payload as { params: ProjectFileFetchParams };
  const res = yield call(API.getProjectFiles, params);

  if (res.code === 200) {
    yield put(ACTIONS.pushFileList(res.data.files, res.pageInfo));
  } else {
    const {
      global: { fetchListFailed },
    } = getBusinessI18n();

    message.error(res.msg || fetchListFailed);
  }

  yield put(ACTIONS.updateLoading(false));
}

function* handleSave(action: ProjectFileActionType) {
  yield put(ACTIONS.updateSaveLoading(true));

  const { folderId, applicationId } = action.payload as ProjectFileSaveParams;
  const { editFile, pageInfo } = store.getState().workspace.projects.personal.file;

  const apis = {
    [FileType.page]: [API.updatePage, API.addPage],
    [FileType.template]: [API.updateTemplate, API.addTemplate],
    [FileType.block]: [updateBlock, addBlock],
  }

  const api: any = editFile.id ? apis[editFile.type][0] : apis[editFile.type][1];

  const rs = yield call(api, {
    id: editFile.id,
    name: editFile.name,
    folderId,
    applicationId,
    tags: editFile.tags,
    suffix: editFile.suffix || (defaultSuffix[editFile.type] as string),
  });

  if (rs.code === 200) {
    yield put(ACTIONS.openEditDrawer(false));

    yield put(
      ACTIONS.fetchFileList({
        ...pageInfo,
        search: '',
        id: folderId,
        applicationId,
      }),
    );
  } else {
    const {
      global: { fetchListFailed },
    } = getBusinessI18n();

    message.error(rs.msg || fetchListFailed);
  }

  yield put(ACTIONS.updateSaveLoading(false));
}

function* handleDeleteFile(action: ProjectFileActionType) {
  const { id, applicationId, folderId } = action.payload as ProjectFileDeleteParams;
  const rs = yield call(API.deleteFile, {
    id,
    applicationId,
    status: true,
  });

  const {
    global: { deleteSuccess, deleteFailed },
  } = getBusinessI18n();

  if (rs.code === 200) {
    message.success(deleteSuccess);

    const { pageInfo } = store.getState().workspace.projects.personal.file;
    yield put(
      ACTIONS.fetchFileList({
        ...pageInfo,
        search: '',
        id: folderId,
        applicationId,
      }),
    );
  } else {
    message.error(rs.msg || deleteFailed);
  }
}

function* handleFetchParentFiles(action: ProjectFileActionType) {
  const { params, cb } = action.payload as { params: ParentFileFetchParams; cb?: (folder) => void };
  const res = yield call(API.fetchParentFiles, params);

  if (res.code === 200) {
    yield put(ACTIONS.pushParentFiles(res.data));

    if (typeof cb === 'function') cb(res.data?.[0]);
  } else {
    const {
      global: { fetchListFailed },
    } = getBusinessI18n();

    message.error(res.msg || fetchListFailed);
  }
}

function* handleFetchAuthList(action: ProjectFileActionType) {
  yield put(ACTIONS.updateAuthListLoading(true));

  const { params } = action.payload as { params: AuthorizeListFetchParams };
  const rs = yield call(AUTH_API.authorizeFetch, params);

  if (rs.code === 200) {
    yield put(ACTIONS.pushAuthList(rs.data || []));
  } else {
    const {
      global: { fetchListFailed },
    } = getBusinessI18n();

    message.error(rs.msg || fetchListFailed);
  }

  yield put(ACTIONS.updateAuthListLoading(false));
}

function* handleSaveAuth(action: ProjectFileActionType) {
  const { params, cb } = action.payload as { params: AuthorizeAddParams; cb: () => void };
  const rs = yield call(AUTH_API.authorizeAdd, params);

  if (rs.code === 200) {
    if (typeof cb === 'function') {
      cb();
    }
  } else {
    const {
      global: { addFailed },
    } = getBusinessI18n();

    message.error(rs.msg || addFailed);
  }
}

function* handleDeleteAuth(action: ProjectFileActionType) {
  const { params, cb } = action.payload as { params: AuthorizeDeleteParams; cb: () => void };
  const rs = yield call(AUTH_API.authorizeDelete, params);

  const {
    global: { deleteSuccess, deleteFailed },
  } = getBusinessI18n();

  if (rs.code === 200) {
    message.success(deleteSuccess);

    if (typeof cb === 'function') {
      cb();
    }
  } else {
    message.error(rs.msg || deleteFailed);
  }
}

function* handleFetchAuthUserList(action: ProjectFileActionType) {
  const { params } = action.payload as { params: AuthorizeUserFetchParams };
  const rs = yield call(AUTH_API.authorizeUserFetch, params);

  if (rs.code === 200) {
    yield put(ACTIONS.pushUserList(rs.data || []));
  } else {
    const {
      global: { fetchListFailed },
    } = getBusinessI18n();

    message.error(rs.msg || fetchListFailed);
  }
}

function* watch() {
  yield takeLatest(getType(ACTIONS.fetchFileList), handleFetchList);
  yield takeLatest(getType(ACTIONS.saveFile), handleSave);
  yield takeLatest(getType(ACTIONS.deleteFile), handleDeleteFile);
  yield takeLatest(getType(ACTIONS.fetchParentFiles), handleFetchParentFiles);
  yield takeLatest(getType(ACTIONS.fetchAuthList), handleFetchAuthList);
  yield takeLatest(getType(ACTIONS.fetchUserList), handleFetchAuthUserList);
  yield takeLatest(getType(ACTIONS.saveAuthUser), handleSaveAuth);
  yield takeLatest(getType(ACTIONS.deleteAuthUser), handleDeleteAuth);
}

export default function* rootSaga() {
  yield all([watch()]);
}
