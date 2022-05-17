import { createApp } from 'vue'
import App from './App.vue'
import {initModels} from './models/ModelUtil';

(async () => {
  await initModels();
  createApp(App).mount('#app')
})();
