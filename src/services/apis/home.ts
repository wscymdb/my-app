import { request } from '..';

export function getImgList() {
  return request.request({
    method: 'get',
    url: '/file/imgList',
  });
}

export function getVideoList() {
  return request.request({
    method: 'get',
    url: '/file/videoList',
  });
}
