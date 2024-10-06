<template>
  <v-app>
    <v-row no-gutters class="fill-height">
      <!-- Image Section -->
      <v-col cols="12" md="6" class="d-none d-md-flex registration-image-col">
        <v-img
          src="/placeholder.svg?height=1080&width=1080"
          aspect-ratio="1"
          class="registration-image"
          alt="MSWD Community Support"
        >
          <div class="image-overlay d-flex flex-column justify-center align-center text-center pa-6">
            <v-avatar size="120" class="mb-6">
              <v-img src="/placeholder.svg?height=120&width=120" alt="MSWD Logo"></v-img>
            </v-avatar>
            <h1 class="text-h2 font-weight-bold white--text mb-4">Welcome to MSWD</h1>
            <p class="text-h6 white--text">Empowering communities, one registration at a time.</p>
          </div>
        </v-img>
      </v-col>

      <!-- Registration Form Section -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center registration-form-col">
        <v-sheet class="registration-form pa-8" rounded elevation="0" max-width="500" width="100%">
          <h2 class="text-h4 font-weight-bold text-center mb-6 primary--text">MSWD Registration</h2>
          <p class="text-subtitle-1 text-center mb-8 secondary--text">
            Create your account to access MSWD services
          </p>
          <v-form @submit.prevent="register" ref="form" v-model="valid" lazy-validation>
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
            
            <v-select
              v-model="selectedCategory"
              :items="categories"
              :rules="[v => !!v || 'Category is required']"
              label="Category"
              prepend-inner-icon="mdi-format-list-bulleted"
              required
              filled
              rounded
              dense
              color="primary"
              class="mb-4"
            ></v-select>
            
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
              class="mb-4"
            ></v-text-field>
            
            <v-text-field
              v-model="passwordConfirm"
              :rules="[v => v === password || 'Passwords do not match']"
              label="Confirm Password"
              prepend-inner-icon="mdi-lock-check"
              :type="showPassword ? 'text' : 'password'"
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
              <v-icon left>mdi-account-plus</v-icon>
              Register
            </v-btn>
          </v-form>
          <div class="text-center mt-6">
            <v-btn text color="primary" to="/Login" class="text-body-2">
              Already have an account? Login here
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
  data() {
    return {
      username: '',
      password: '',
      passwordConfirm: '',
      selectedCategory: null,
      message: '',
      categories: ['PWD', 'Senior Citizen', 'Solo Parent'],
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
        v => v.length >= 8 || 'Password must be at least 8 characters',
        v => /\d/.test(v) || 'Password must contain at least one number',
        v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
        v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Password must contain at least one special character',
      ],
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const response = await axios.post('api/register', {
            username: this.username,
            password: this.password,
            role: 'user',
            category: this.selectedCategory
          });

          if (response.data.msg === 'okay') {
            this.snackbarColor = 'success';
            this.message = 'Registered successfully';
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push('/Login');
            }, 2000);
          } else {
            this.message = 'Registration failed. Please try again.';
            this.snackbar = true;
          }
        } catch (error) {
          console.error('Error during registration:', error);
          this.message = 'An error occurred. Please try again later.';
          this.snackbar = true;
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

.registration-image-col {
  background-color: #4caf50;
}

.registration-image {
  height: 100%;
}

.image-overlay {
  background-color: rgba(76, 175, 80, 0.8);
  height: 100%;
}

.registration-form-col {
  background-color: #f1f8e9;
}

.registration-form {
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
  .registration-form {
    border-radius: 0;
    height: 100%;
  }
}
</style>