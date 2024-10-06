<template>
  <v-app>
    <v-row no-gutters class="fill-height">
      <!-- Image Section -->
      <v-col cols="12" md="6" class="d-none d-md-flex login-image-col">
        <v-img
          src="/placeholder.svg?height=1080&width=1080"
          aspect-ratio="1"
          class="login-image"
          alt="MSWD Community Support"
        >
          <div class="image-overlay d-flex flex-column justify-center align-center text-center pa-6">
            <v-avatar size="120" class="mb-6">
              <v-img src="/placeholder.svg?height=120&width=120" alt="MSWD Logo"></v-img>
            </v-avatar>
            <h1 class="text-h2 font-weight-bold white--text mb-4">Welcome to MSWD</h1>
            <p class="text-h6 white--text">Empowering communities, one login at a time.</p>
          </div>
        </v-img>
      </v-col>

      <!-- Login Form Section -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center login-form-col">
        <v-sheet class="login-form pa-8" rounded elevation="0" max-width="500" width="100%">
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
              class="mb-4"
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
              class="mb-6"
            ></v-text-field>
            
            <v-btn
              type="submit"
              block
              x-large
              rounded
              class="mt-6 custom-btn"
              color="primary"
              :loading="loading"
              :disabled="!valid || loading"
            >
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
          </v-form>
          <div class="text-center mt-6">
            <v-btn text color="primary" to="/forgot-password" class="text-body-2 mb-2">
              Forgot Password?
            </v-btn>
            <br>
            <v-btn text color="primary" to="/RegisterComponent" class="text-body-2">
              Don't have an account? Register here
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Snackbar Notification -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="4000" top>
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
      v => v.length >= 5 || 'Password must be at least 5 characters',
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
.fill-height {
  height: 100vh;
}

.login-image-col {
  background-color: #4caf50;
}

.login-image {
  height: 100%;
}

.image-overlay {
  background-color: rgba(76, 175, 80, 0.8);
  height: 100%;
}

.login-form-col {
  background: linear-gradient(135deg, #f1f8e9 0%, #c8e6c9 100%);
}

.login-form {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-text-field >>> .v-input__slot,
.v-select >>> .v-input__slot {
  border-radius: 28px;
}

.v-text-field >>> .v-label,
.v-select >>> .v-label {
  font-size: 14px;
}

@media (max-width: 960px) {
  .login-form {
    border-radius: 0;
    height: 100%;
  }
}
</style>