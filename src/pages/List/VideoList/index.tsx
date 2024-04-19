import React, { memo, useEffect, useState } from 'react';
import { List } from 'antd';
import api from '@/services/apis';
import './index.less';

const VideoList = memo(() => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    getImgList();
  }, []);

  const getImgList = async () => {
    const { status, data } = await api.home.getVideoList();
    setDataSource(data);

    console.log(data);
  };

  return (
    <div className="video-list">
      <List
        grid={{
          gutter: [24, 24],
          xxl: 8,
          xl: 6,
          lg: 4,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item>
            <div className="video-item">
              <video src={item.url} controls></video>
            </div>
            {/* <CardItem key={item.url} info={item} /> */}
          </List.Item>
        )}
      />
    </div>
  );
});

export default VideoList;
