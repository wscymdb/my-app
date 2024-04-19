import { defineConfig } from 'umi';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: './Home' },
  { path: '/list', component: './List' },
  { path: '/upload', component: './PCUploadFile' },
];

export default defineConfig({
  history: {
    type: 'hash',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes,
  npmClient: 'tnpm',
});
