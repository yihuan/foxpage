import { BaseModelAbstract } from './abstracts/base-model-abstract';

export class FileModel extends BaseModelAbstract {
  private static _instance: FileModel;

  constructor() {
    super();
  }

  /**
   * Single instance
   * @returns FileModel
   */
  public static getInstance(): FileModel {
    this._instance || (this._instance = new FileModel());
    return this._instance;
  }

  getPageList() {
    return [];
  }

  getCount() {
    return 1;
  }

  getDetailByNames() {
    return [];
  }

  getAppFileList() {
    return [];
  }
}
