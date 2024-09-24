<template>
  <v-app>
    <v-container class="login-container" fluid fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="login-card" elevation="10">
            <v-img
              src="/placeholder.svg?height=100&width=100"
              alt="Logo"
              class="mx-auto mt-6"
              max-width="100"
            ></v-img>
            <v-card-title class="title text-h4 font-weight-bold">Welcome Back</v-card-title>
            <v-card-subtitle class="sub-title text-subtitle-1">Please login to your account</v-card-subtitle>
            <v-card-text class="form">
              <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  prepend-icon="mdi-account"
                  outlined
                  dense
                  color="primary"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  outlined
                  dense
                  color="primary"
                  required
                ></v-text-field>
                <v-btn
                  type="submit"
                  block
                  class="login-button mt-6"
                  :loading="loading"
                  :disabled="!valid || loading"
                >
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <router-link to="/forgot-password" class="forgot-password">Forgot Password?</router-link>
            </v-card-actions>
            <v-card-actions class="justify-center">
              <router-link to="/RegisterComponent" class="register-link">Don't have an account? Register here</router-link>
            </v-card-actions>
            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="4000" top>
              {{ message }}
              <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    username: '',
    password: '',
    message: '',
    valid: true,
    loading: false,
    showPassword: false,
    snackbar: false,
    snackbarColor: 'error',
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length >= 3 || 'Username must be at least 3 characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be at least 6 characters',
    ],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const response = await axios.post('/api/login', {
            username: this.username,
            password: this.password,
          });

          if ('msg' in response.data) {
            if (response.data.msg === 'okay') {
              this.snackbarColor = 'success';
              this.message = 'Login successful!';
              this.snackbar = true;

              // Check the user role and redirect accordingly
              switch (response.data.role) {
                case 'admin':
                  this.$router.push('/Dashboard');
                  break;
                case 'user':
                  // Assuming you also want to fetch the category here
                  switch (response.data.category) {
                    case 'PWD':
                      this.$router.push('/temlpatep');
                      break;
                    case 'Senior Citizen':
                      this.$router.push('/SeniorTemplate');
                      break;
                    case 'Solo Parent':
                      this.$router.push('/SoloTemplate');
                      break;
                    default:
                      this.message = 'Invalid category. Please contact support.';
                      this.snackbar = true;
                  }
                  break;
                default:
                  this.message = 'Invalid role. Please contact support.';
                  this.snackbar = true;
              }
            } else {
              this.message = 'Login failed. Please try again.';
              this.snackbar = true;
            }
          } else {
            this.message = 'Unexpected response structure. Please try again.';
            this.snackbar = true;
            console.error('Unexpected response structure:', response);
          }
        } catch (error) {
          this.message = 'Error during login. Please try again later.';
          this.snackbar = true;
          console.error('Error during login:', error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.v-application {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.title {
  text-align: center;
  color: #4caf50;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 700;
}

.sub-title {
  text-align: center;
  color: #757575;
  margin-bottom: 24px;
  font-size: 16px;
}

.form {
  padding: 0 32px;
}

.login-button {
  margin-top: 24px;
  background-color: #4caf50 !important;
  color: #fff !important;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #45a049 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.forgot-password,
.register-link {
  text-align: center;
  margin-top: 16px;
  color: #4caf50;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover,
.register-link:hover {
  color: #45a049;
}

.v-text-field >>> .v-input__slot {
  background-color: #f5f5f5 !important;
}

.v-text-field >>> .v-label {
  color: #757575;
}

.v-text-field >>> .v-input__icon {
  color: #4caf50;
}
</style>