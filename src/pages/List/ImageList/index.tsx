import React, { memo, useEffect, useState } from 'react';
import { List } from 'antd';
import CardItem from '@/components/CardItem';
import api from '@/services/apis';

const ImageList = memo(() => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    getImgList();
  }, []);

  const getImgList = async () => {
    const { status, data } = await api.home.getImgList();
    setDataSource(data);

    console.log(data);
  };

  return (
    <div>
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
            <CardItem key={item.url} info={item} />
          </List.Item>
        )}
      />
    </div>
  );
});

export default ImageList;
