import React, { useContext, useEffect, useRef, useState } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Input, Select, Spin, Tag, Tooltip } from 'antd';

import { FoxContext } from '@/context/index';
import { RenderStructureNode } from '@/types/index';

import { Field, Label } from '../components/group';

const { Option } = Select;

interface IProps {
  node: RenderStructureNode;
  onChange: (key: string, val: string) => void;
  onApplyState: () => void;
}

const Basic = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const { node, onChange, onApplyState } = props;
  const { foxI18n, events, config } = useContext(FoxContext);
  const { id, label, name, version, __versions: versions = [] } = node || {};

  useEffect(() => {}, []);

  const isASCII = (val: string) => {
    return /^[\x00-\x7F]*$/.test(val);
  };

  const inputValRef = useRef('');

  useEffect(() => {
    inputValRef.current = label;
  }, []);

  const checkInput = (e) => {
    const val = e.target.value;
    if (isASCII(val)) {
      onChange('label', val);
      inputValRef.current = val;
    } else {
      onChange('label', inputValRef.current);
    }
  };

  const handleVersionChange = (value: string) => {
    onChange('version', value);
    onApplyState();
  };

  const handleFetchComponentVersions = (value: boolean) => {
    if (value && typeof events.onFetchComponentVersions === 'function') {
      setLoading(true);
      events.onFetchComponentVersions({ id, name });
    }
  };

  return (
    <div className="px-3 pb-3">
      <div>
        <Field>
          <Label>Id</Label>
          <Input value={id} disabled />
        </Field>

        <Field>
          <Label>
            {foxI18n.label}
            <span style={{ color: '#f90', marginLeft: 4 }}>
              ({foxI18n.labelSupportFollowingChars}: 0-9 a-z A-Z [] () _ -)
            </span>
          </Label>
          <Input
            value={label}
            maxLength={30}
            placeholder="Label"
            onChange={checkInput}
            onBlur={() => {
              onApplyState();
            }}
          />
        </Field>

        <Field>
          <Label>{foxI18n.name}</Label>
          <Input value={name} disabled />
        </Field>
        <Field>
          <Label>
            {foxI18n.version}
            <Tooltip title={foxI18n.versionTips}>
              <QuestionCircleOutlined style={{ marginLeft: 4 }} />
            </Tooltip>
          </Label>
          <Select
            value={version}
            style={{ width: '100%' }}
            disabled={!!config.sys?.readOnly}
            onDropdownVisibleChange={handleFetchComponentVersions}
            notFoundContent={loading ? <Spin size="small" /> : null}
            onChange={handleVersionChange}>
            {versions.map((item) => (
              <Option key={item.version} value={item.version}>
                {item.version} {item.isLive && <Tag color="green">{foxI18n.isLive}</Tag>}
              </Option>
            ))}
          </Select>
        </Field>
      </div>
    </div>
  );
};

export default Basic;
