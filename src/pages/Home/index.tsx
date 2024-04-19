import React, { memo, useState } from 'react';
import { Button, List } from 'antd';
import { Link } from 'umi';

const routes = [{ path: '/home' }, { path: '/list' }, { path: '/upload' }];

const Home = memo(() => {
  return (
    <div className="home">
      <List
        size="small"
        header={<h1>路由</h1>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={routes}
        renderItem={(item) => {
          console.log(item);
          return (
            <List.Item>
              <Link to={item.path}>{item.path}</Link>
            </List.Item>
          );
        }}
      />
    </div>
  );
});

export default Home;
