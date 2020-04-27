import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './global-components';

import '@/assets/tailwind.scss';

const app = createApp(App);
const globalComponentRegistry = new components(app);

// Add vue plugins
app.use(router).use(store);

// Register Components
globalComponentRegistry.register();

// Mount application
app.mount('#app');
