import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import axios from 'axios'

// Set the base URL for axios
axios.defaults.baseURL = "http://localhost:8080/"

// Load fonts
loadFonts()

// Create the Vue app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(store)
app.use(vuetify)

// Check authentication status before mounting the app
store.dispatch('checkAuth').then(() => {
  // Mount the app after authentication check
  app.mount('#app')
}).catch(error => {
  console.error('Authentication check failed:', error)
  // You might want to handle the error, perhaps redirect to a login page
  // or mount the app anyway, depending on your requirements
  app.mount('#app')
})

// If you need to use axios in components, you can add it to the global properties
app.config.globalProperties.$axios = axios