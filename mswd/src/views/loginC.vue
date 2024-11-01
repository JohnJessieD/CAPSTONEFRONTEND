<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const error = ref('');
      const isLoading = ref(false);
  
      const handleLogin = async () => {
        isLoading.value = true;
        error.value = '';
        const success = await store.dispatch('login', {
          username: username.value,
          password: password.value,
        });
        isLoading.value = false;
        if (success) {
          router.push('/dashboard');
        } else {
          error.value = 'Login failed. Please check your credentials.';
        }
      };
  
      return {
        username,
        password,
        error,
        isLoading,
        handleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 5px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>