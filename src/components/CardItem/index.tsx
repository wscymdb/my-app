import React, { memo } from 'react';
import { Image, Skeleton } from 'antd';
import './index.less';

interface ICardItemProps {
  info: Record<string, any>;
}

const CardItem = memo(({ info }: ICardItemProps) => {
  return (
    <div className="card-item">
      <Image
        src={info.url}
        width="100%"
        height={200}
        placeholder={
          <Skeleton.Image active style={{ minWidth: 230, height: 200 }} />
        }
      />
      <a href={info.url} target="_blank">
        走你
      </a>
      {/* <div className="name">{info.name}</div> */}
    </div>
  );
});

export default CardItem;
