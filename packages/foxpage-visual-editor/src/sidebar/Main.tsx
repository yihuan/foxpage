import React, { useContext } from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Resizable } from 're-resizable';

import { PanelHeader } from '@/components/index';
import { FoxContext } from '@/context/index';

import Actions from './structure/Actions';
import { Structure } from './structure';

interface IProps {
  structurePinned?: boolean;
  onPushPin?: (status: boolean) => void;
  onClose?: () => void;
}

const DragHandle = () => {
  return (
    <div className="absolute z-50 -right-1 pl-[5px] h-full w-full items-center flex">
      <div className="bg-white rounded text-xs py-1 shadow-sm">
        <MoreOutlined />
      </div>
    </div>
  );
};

const SidebarMain = (props: IProps) => {
  const { foxI18n } = useContext(FoxContext);
  const { onPushPin, onClose, structurePinned } = props;

  const handlePushpin = () => {
    if (typeof onPushPin === 'function') {
      onPushPin(!structurePinned);
    }
  };

  return (
    <Resizable
      defaultSize={{ width: 300, height: '100%' }}
      minWidth={300}
      maxWidth={500}
      handleComponent={{ right: <DragHandle /> }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}>
      <div className="h-full w-full flex flex-col overflow-x-auto">
        <PanelHeader
          key="structure"
          title={foxI18n.structureTitle}
          extra={<Actions pushpin={structurePinned} onClose={onClose} onPushpin={handlePushpin} />}
        />
        <Structure />
      </div>
    </Resizable>
  );
};

export default SidebarMain;
