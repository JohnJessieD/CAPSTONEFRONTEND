<template>
  <v-app>
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <v-col cols="12" md="6" class="d-none d-md-flex login-image-col">
          <v-img
            src="/placeholder.svg?height=1080&width=1080"
            aspect-ratio="1"
            class="login-image"
            alt="MSWD Community Support"
          >
            <div class="image-overlay d-flex flex-column justify-center align-center text-center pa-6">
              <v-avatar size="120" class="mb-6 elevation-10">
                <v-img src="/placeholder.svg?height=120&width=120" alt="MSWD Logo"></v-img>
              </v-avatar>
              <h1 class="text-h2 font-weight-bold white--text mb-4 text-shadow">Welcome to MSWD</h1>
              <p class="text-h6 white--text text-shadow">Empowering communities, one login at a time.</p>
            </div>
          </v-img>
        </v-col>

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
  }),
  mounted() {
    // Check if a username is stored in local storage and set it if available
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

              // Store username in local storage
              localStorage.setItem('username', this.username);

              // Check the user role and redirect accordingly
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
          this.message = response.data.msg || 'Password reset instructions have been sent to your email.';
          this.snackbar = true;
          this.showForgotPasswordDialog = false;
        } catch (error) {
          this.snackbarColor = 'error';
          this.message = error.response?.data?.msg || 'Error processing your request. Please try again later.';
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
  background-color: #2e7d32;
}

.login-image {
  height: 100%;
}

.image-overlay {
  background-color: rgba(46, 125, 50, 0.8);
  height: 100%;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.login-form-col {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.login-form {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.custom-btn {
  text-transform: none;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.input-field :deep(.v-input__slot) {
  border-radius: 28px;
  transition: all 0.3s ease;
}

.input-field:hover :deep(.v-input__slot) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-field :deep(.v-label) {
  font-size: 14px;
}

@media (max-width: 960px) {
  .login-form {
    border-radius: 0;
    height: 100%;
  }
}
</style>