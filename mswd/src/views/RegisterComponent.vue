<template>
    <div class="container">
      <div class="login-container">
        <v-sheet width="300" class="mx-auto custom-border">
          <v-form @submit.prevent="register">
            <v-alert v-if="message === 'error'" type="error" dense dismissible>
              Invalid response
            </v-alert>
            <v-text-field v-model="username" label="Username" required dense></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required dense></v-text-field>
            <v-text-field v-model="passwordConfirm" label="Confirm Password" type="password" required dense></v-text-field>
            <v-alert v-if="message === 'passwordMismatch'" type="error" dense dismissible>
              Passwords do not match
            </v-alert>
            <v-alert v-if="message === 'registrationFailed'" type="error" dense dismissible>
              Registration failed. Please try again.
            </v-alert>
            <v-btn type="submit" block class="mt-4 custom-btn" color="primary">Submit</v-btn>
            <div class="mt-3 text-center">
              <v-divider></v-divider>
              <span class="caption">Already have an account?</span>
              <router-link to="/logincomponent" class="router-link">Login here</router-link>
            </div>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        passwordConfirm: '',
        message: '',
      };
    },
    methods: {
      async register() {
        if (this.password === this.passwordConfirm) {
          try {
            const response = await axios.post('api/register', {
              username: this.username,
              password: this.password,
              role: 'user', // Hardcoded role as 'user'
            });
  
            if (response.data.msg === 'okay') {
              alert('Registered successfully');
              this.$router.push('/Login');
            } else {
              this.message = 'registrationFailed';
            }
          } catch (error) {
            console.error('Error during registration:', error);
            this.message = 'error';
          }
        } else {
          this.message = 'passwordMismatch';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  .login-container {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .custom-border {
    border: none;
  }
  
  .v-text-field {
    margin-top: 15px;
  }
  
  .error-message {
    color: #f44336;
  }
  
  .router-link {
    color: #1976D2;
    text-decoration: none;
  }
  
  .router-link:hover {
    text-decoration: underline;
  }
  
  .caption {
    font-size: 14px;
    margin-top: 8px;
    display: block;
    color: #757575;
  }
  
  .text-center {
    text-align: center;
  }
  
  .custom-btn {
    border-radius: 5px;
  }
  </style>
  