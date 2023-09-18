import 'reflect-metadata';

import _ from 'lodash';
import { Body, Ctx, JsonController, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { i18n } from '../../../app.config';
import { METHOD, TAG, TYPE } from '../../../config/constant';
import metric from '../../third-parties/metric';
import { FileWithOnline } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { StoreFileStatus } from '../../types/store-types';
import { AppFileListReq, FileDetailRes } from '../../types/validates/file-validate-types';
import * as Response from '../../utils/response';
import { BaseController } from '../base-controller';

@JsonController('components')
export class GetComponentFileList extends BaseController {
  constructor() {
    super();
  }

  /**
   * Get the details of the component files
   * @param  {FileListReq} params
   * @returns {FileUserInfo}
   */
  @Post('/files')
  @OpenAPI({
    summary: i18n.sw.getComponentFilesInfo,
    description: '',
    tags: ['Component'],
    operationId: 'get-component-files-info',
  })
  @ResponseSchema(FileDetailRes)
  async index(@Ctx() ctx: FoxCtx, @Body() params: AppFileListReq): Promise<ResData<FileWithOnline[]>> {
    try {
      ctx.logAttr = Object.assign(ctx.logAttr, { method: METHOD.GET });

      // Get file details and status of whether it is on the store
      const [fileList, goodsStatusList] = await Promise.all([
        this.service.file.list.find({
          applicationId: params.applicationId,
          id: { $in: params.ids },
          type: { $in: [TYPE.COMPONENT, TYPE.SYSCOMPONENT, TYPE.EDITOR] },
          deleted: false,
        }),
        this.service.store.goods.getAppFileStatus(params.applicationId, params.ids),
      ]);

      // Get reference file info
      let referenceFileIds: string[] = [];
      let referenceFileMap: Record<string, string> = {};
      let deprecatedObject: Record<string, boolean> = {};
      fileList.forEach((file) => {
        const referenceTag = this.service.content.tag.getTagsByKeys(file.tags as any[], ['reference']);
        const deprecatedTag = _.find(file.tags, (tag) => tag.type === TAG.DEPRECATED);
        deprecatedObject[file.id] = deprecatedTag?.status || false;
        if (referenceTag['reference']?.id) {
          referenceFileIds.push(referenceTag['reference'].id);
          referenceFileMap[file.id] = referenceTag['reference'].id;
        }
      });

      const userIds = _.map(fileList, 'creator');
      const goodsStatusObject: Record<string, StoreFileStatus> = _.keyBy(goodsStatusList, 'id');
      const [userBaseObject, referenceFileList] = await Promise.all([
        this.service.user.getUserBaseObjectByIds(userIds),
        this.service.file.list.getDetailByIds(referenceFileIds),
      ]);
      const referenceFileObject = _.keyBy(referenceFileList, 'id');

      let fileWithOnlineList: FileWithOnline[] = [];
      fileList.forEach((file) => {
        let componentDeprecatedStatus = deprecatedObject[file.id] || false;
        if (!componentDeprecatedStatus && referenceFileMap[file.id]) {
          const referenceDeprecated = _.find(
            referenceFileObject[referenceFileMap[file.id]]?.tags || [],
            (tag) => tag.type === TAG.DEPRECATED,
          );
          componentDeprecatedStatus = referenceDeprecated?.status || false;
        }

        fileWithOnlineList.push(
          Object.assign(
            {
              deprecated: componentDeprecatedStatus,
              online: goodsStatusObject?.[file.id]?.status ? true : false,
              creator: userBaseObject[file.creator] || {},
              componentType:
                referenceFileObject[referenceFileMap[file.id]]?.componentType || file.componentType || '',
            },
            _.omit(file, 'creator'),
          ) as FileWithOnline,
        );
      });

      // send metric
      fileWithOnlineList.length === 0 && metric.empty(ctx.request.url);

      return Response.success(fileWithOnlineList || [], 1170301);
    } catch (err) {
      return Response.error(err, i18n.file.listError, 3170301);
    }
  }
}
