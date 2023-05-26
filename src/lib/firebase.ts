// firebase.ts

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_WEB_APP_ID'
};

const app = initializeApp(firebaseConfig);

export default app;
