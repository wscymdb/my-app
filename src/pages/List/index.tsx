import React, { memo } from 'react';
import { Tabs, TabsProps } from 'antd';
import ImageList from './ImageList';
import VideoList from './VideoList';
import './index.less';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <h1>ImageList</h1>,
    children: <ImageList />,
  },
  {
    key: '2',
    label: <h1>VideoList</h1>,
    children: <VideoList />,
  },
];

const ListPage = memo(() => {
  const onChange = (key: string) => {};
  return (
    <div className="list-page">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
});

export default ListPage;
