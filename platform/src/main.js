import './assets/app.03ec750e.css'
import './assets/chunk-3cec2262.224e21a2.css'
import './assets/chunk-elementUI.68c70ad5.css'
import './assets/chunk-libs.3dfb7769.css'
import './assets/chunk-240c6b87.eb4fc008.css'
import './assets/chunk-316d3be8.5b17d3dd.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
