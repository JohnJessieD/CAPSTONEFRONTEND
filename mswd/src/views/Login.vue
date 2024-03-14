<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Simulate authentication
        if (this.username === 'user' && this.password === 'user') {
          // Redirect to '/' for regular user
          this.$router.push('/');
        } else if (this.username === 'admin' && this.password === 'admin') {
          // Redirect to '/AdminNav' for admin user
          this.$router.push('/AdminNav');
        } else {
          // Handle failed login
          alert('Invalid username or password');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 5%;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    height: 100;
    margin-top: 5%;
}
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus,
  input[type="password"]:focus {
    outline: none;
    border-color: #007bff;
  }
  
  button {
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  