import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Typography, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import {
  CloudUploadOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'umi';
import './index.less';

const PCUploadFile: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((item) => ({
        ...item,
        url: item?.response?.url,
      })),
    );
  };

  const customRequest = ({ file, onSuccess, onError }: any) => {
    const fd = new FormData();
    fd.append(
      'file',
      new Blob([file], { type: file.type }),
      encodeURIComponent(file.name),
    );

    fetch('http://114.55.110.144/api/file/single', {
      method: 'POST',
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        message.success('上传成功～👹');
        onSuccess(res);
      });
  };

  const goBack = () => {
    navigate('/');
  };

  const handleClick = () => {
    uploadRef.current?.click();
  };

  const uploadButton = (
    <div className="upload-img" ref={uploadRef}>
      <CloudUploadOutlined className="upload-icon" />
      <div style={{ marginTop: 13 }}>拖拽/点击上传素材</div>
    </div>
  );

  const style = {
    left: -100000,
  };

  return (
    <div className="pc-upload-file">
      <div className="header-section">
        <div className="left-header">
          <ArrowLeftOutlined className="back" onClick={goBack} />
          <Typography>文件上传</Typography>
        </div>
        <div className="right-header">
          {!!fileList.length && (
            <Button
              icon={<UploadOutlined />}
              type="primary"
              onClick={handleClick}
            >
              上传
            </Button>
          )}
        </div>
      </div>
      <div className="upload-section" style={fileList.length ? style : {}}>
        <div className="upload">
          <Upload.Dragger
            listType="picture-card"
            multiple
            fileList={fileList}
            showUploadList={{ showPreviewIcon: false }}
            customRequest={customRequest}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload.Dragger>
        </div>
        <div className="tips">支持批量上传，支持拖拽上传</div>
      </div>

      <div className="file-list">
        {fileList.map((item) => (
          <Image key={item.url} height={200} src={item.url} />
        ))}
      </div>
    </div>
  );
};

export default PCUploadFile;
