<template>
  <v-app>
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <!-- Left Image Section -->
        <v-col cols="12" md="6" class="d-none d-md-flex login-image-col">
          <v-img
            src="/placeholder.svg?height=1080&width=1080"
            aspect-ratio="1"
            class="login-image"
            alt="MSWD Community Support"
          >
            <div class="image-overlay d-flex flex-column justify-center align-center text-center pa-6">
              <v-avatar size="120" class="mb-6 elevation-10">
                <v-img src="/img/download.jpg" alt="MSWD Logo"></v-img>
              </v-avatar>
              <h1 class="text-h2 font-weight-bold white--text mb-4 text-shadow">Welcome to MSWD</h1>
              <p class="text-h6 white--text text-shadow">Empowering communities, one login at a time.</p>
            </div>
          </v-img>
        </v-col>

        <!-- Login Form Section -->
        <v-col cols="12" md="6" class="d-flex align-center justify-center login-form-col">
          <v-sheet class="login-form pa-8" rounded="lg" elevation="10" max-width="500" width="100%">
            <h2 class="text-h4 font-weight-bold text-center mb-6 primary--text">Welcome Back</h2>
            <p class="text-subtitle-1 text-center mb-8 secondary--text">
              Please login to your account
            </p>
            <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                prepend-inner-icon="mdi-account"
                required
                filled
                rounded
                dense
                color="primary"
                class="mb-4 input-field"
              ></v-text-field>
              
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
                filled
                rounded
                dense
                color="primary"
                class="mb-6 input-field"
              ></v-text-field>
              
              <v-btn
                type="submit"
                block
                x-large
                rounded="pill"
                class="mt-6 custom-btn"
                color="primary"
                :loading="loading"
                :disabled="!valid || loading"
                elevation="2"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            </v-form>
            <div class="text-center mt-6">
              <v-btn text color="primary" @click="showForgotPasswordDialog = true" class="text-body-2 mb-2 font-weight-medium">
                Forgot Password?
              </v-btn>
              <br>
              <v-btn text color="primary" to="/RegisterComponent" class="text-body-2 font-weight-medium">
                Don't have an account? Register here
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- Forgot Password Dialog -->
    <v-dialog v-model="showForgotPasswordDialog" max-width="500px">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="text-h5 justify-center">Forgot Password</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="forgotPassword" ref="forgotPasswordForm" v-model="forgotPasswordValid" lazy-validation>
            <v-text-field
              v-model="forgotPasswordEmail"
              :rules="emailRules"
              label="Email"
              prepend-inner-icon="mdi-email"
              required
              filled
              rounded
              dense
              color="primary"
              class="mb-4 input-field"
            ></v-text-field>
            <v-btn
              type="submit"
              block
              rounded="pill"
              class="mt-6 custom-btn"
              color="primary"
              :loading="forgotPasswordLoading"
              :disabled="!forgotPasswordValid || forgotPasswordLoading"
              elevation="2"
            >
              Reset Password
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="4000" top rounded="pill">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
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
    showForgotPasswordDialog: false,
    forgotPasswordEmail: '',
    forgotPasswordValid: true,
    forgotPasswordLoading: false,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ],
  }),
  mounted() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  },
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

              localStorage.setItem('username', this.username);

              switch (response.data.role) {
                case 'admin':
                  this.$router.push('/Dashboard');
                  break;
                case 'user':
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

    async forgotPassword() {
      if (this.$refs.forgotPasswordForm.validate()) {
        this.forgotPasswordLoading = true;
        try {
          const response = await axios.post('/api/forgot-password', {
            email: this.forgotPasswordEmail,
          });

          this.snackbarColor = 'success';
          this.message = response.data.message || 'Password reset instructions have been sent to your email.';
          this.snackbar = true;
          this.showForgotPasswordDialog = false;
        } catch (error) {
          this.snackbarColor = 'error';
          this.message = error.response?.data?.message || 'Error processing your request. Please try again later.';
          this.snackbar = true;
          console.error('Error during forgot password:', error);
        } finally {
          this.forgotPasswordLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.login-image-col {
  background: radial-gradient(circle, #2e7d32, #1b5e20);
}

.login-image {
  height: 100%;
}

.image-overlay {
  background-color: rgba(46, 125, 50, 0.85);
  height: 100%;
  transition: all 0.5s ease-in-out;
}

.image-overlay:hover {
  background-color: rgba(46, 125, 50, 0.95);
}

.text-shadow {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}

.login-form-col {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.login-form {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

.custom-btn {
  text-transform: none;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.input-field :deep(.v-input__control) {
  border-radius: 28px;
  padding: 16px 12px;
  transition: all 0.3s ease;
}

.input-field :deep(.v-input__control:hover) {
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-field :deep(.v-label) {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

@media (max-width: 960px) {
  .login-form {
    border-radius: 0;
    height: 100%;
  }
}

.v-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
}
</style>
