import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BlockOutlined, BuildOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Table as AntTable, Tag, Tooltip } from 'antd';
import styled from 'styled-components';

import { Name } from '@/components/index';
import { FileType, ROUTE_CONTENT_MAP, suffixTagColor } from '@/constants/index';
import { GlobalContext } from '@/pages/system';
import { File, PaginationInfo } from '@/types/index';
import { getLocationIfo, periodFormat } from '@/utils/index';

const Table = styled(AntTable)`
  .ant-table-pagination.ant-pagination {
    margin: 24px 0 0;
  }
`;

interface ProjectFileListProps {
  type: string;
  loading: boolean;
  pageInfo: PaginationInfo;
  fileList: File[];
  openDrawer: (open: boolean, editFile?: File) => void;
}

const ProjectFileList: React.FC<ProjectFileListProps> = (props: ProjectFileListProps) => {
  const { type, loading, pageInfo, fileList } = props;

  // url search params
  const history = useHistory();
  const { pathname, search, applicationId, folderId, folderPage, folderSearch, page } = getLocationIfo(
    history.location,
  );

  // i18n
  const { locale } = useContext(GlobalContext);
  const { global, file } = locale.business;

  const columns: any = [
    {
      title: '',
      dataIndex: '',
      width: 40,
      render: (_, record: File) => (
        <>
          {record?.type === FileType.page && <FileTextOutlined />}
          {record?.type === FileType.template && <FileOutlined />}
          {record?.type === FileType.block && <BlockOutlined />}
        </>
      ),
    },
    {
      title: global.nameLabel,
      dataIndex: 'name',
      render: (text: string, record: File) => (
        <Link
          onClick={() => {
            localStorage['foxpage_project_file'] = JSON.stringify(record);
          }}
          to={{
            pathname: `${ROUTE_CONTENT_MAP[type].replace(':applicationId', applicationId)}`,
            search: `?applicationId=${applicationId}&fileId=${record.id}&filePage=${page || ''}&folderPage=${
              folderPage || ''
            }&folderSearch=${folderSearch || ''}`,
          }}>
          <Tooltip placement="topLeft" mouseEnterDelay={1} title={text}>
            <Name style={{ maxWidth: type === 'projects' ? 260 : 240 }}>{text}</Name>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: global.idLabel,
      dataIndex: 'id',
      width: 100,
    },
    {
      title: global.type,
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Tag color={suffixTagColor[text]} style={{ minWidth: '38px', textAlign: 'center' }}>
          {file[text]}
        </Tag>
      ),
    },
    {
      title: global.creator,
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      render: (creator) => creator?.email || '--',
    },
    {
      title: global.createTime,
      dataIndex: 'createTime',
      key: 'createTime',
      width: 170,
      render: (text: string) => periodFormat(text, 'unknown'),
    },
    {
      title: global.actions,
      key: '',
      width: 80,
      render: (_text: string, record: File) => (
        <Button
          type="default"
          size="small"
          shape="circle"
          title={global.build}
          disabled={!record?.hasContent}>
          <Link
            to={{
              pathname: '/builder',
              search: `?applicationId=${applicationId}&folderId=${folderId}&fileId=${record.id}`,
              state: { backPathname: pathname, backSearch: search },
            }}
            onClick={() => {
              localStorage['foxpage_project_file'] = JSON.stringify(record);
            }}>
            <BuildOutlined />
          </Link>
        </Button>
      ),
    },
  ];

  const handlePaginationChange = (pagination) => {
    history.push({
      pathname,
      search: `?applicationId=${applicationId}&folderId=${folderId}&folderPage=${folderPage}&folderSearch=${folderSearch}&page=${pagination.current}`,
    });
  };

  return (
    <Table
      rowKey="id"
      dataSource={fileList}
      columns={columns}
      loading={loading}
      pagination={
        pageInfo?.total && pageInfo.total > pageInfo.size
          ? {
              position: ['bottomCenter'],
              current: pageInfo.page,
              pageSize: pageInfo.size,
              total: pageInfo.total,
              showSizeChanger: false,
            }
          : false
      }
      onChange={handlePaginationChange}
    />
  );
};

export default ProjectFileList;
