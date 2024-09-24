<template>
  <v-app>
    <v-container fluid fill-height class="background">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="registration-card" elevation="10">
            <v-card-title class="text-h4 font-weight-bold text-center mb-4">
              MSWD Registration
            </v-card-title>
            <v-card-subtitle class="text-subtitle-1 text-center mb-6">
              Welcome to MSWD registration portal. Please fill out the form below to create your account.
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="register" ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  prepend-icon="mdi-account"
                  required
                  outlined
                  dense
                ></v-text-field>
                
                <v-select
                  v-model="selectedCategory"
                  :items="categories"
                  :rules="[v => !!v || 'Category is required']"
                  label="Category"
                  prepend-icon="mdi-format-list-bulleted"
                  required
                  outlined
                  dense
                ></v-select>
                
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                  outlined
                  dense
                ></v-text-field>
                
                <v-text-field
                  v-model="passwordConfirm"
                  :rules="[v => v === password || 'Passwords do not match']"
                  label="Confirm Password"
                  prepend-icon="mdi-lock-check"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  outlined
                  dense
                ></v-text-field>
                
                <v-btn
                  type="submit"
                  block
                  class="mt-6 custom-btn"
                  color="primary"
                  :loading="loading"
                  :disabled="!valid || loading"
                >
                  Register
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn text color="primary" to="/Login" class="text-caption">
                Already have an account? Login here
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
        v => v.length >= 6 || 'Password must be at least 6 characters',
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
.background {
  background: linear-gradient(135deg, #91a79b 0%, #6b8e7d 100%);
  min-height: 100vh;
}

.registration-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.registration-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.v-card__title {
  color: #2e7d32;
  font-size: 28px !important;
  font-weight: 700 !important;
}

.v-card__subtitle {
  color: #4caf50;
  font-size: 16px !important;
}

.custom-btn {
  background-color: #4caf50 !important;
  color: #ffffff !important;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #45a049 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-text-field >>> .v-input__slot,
.v-select >>> .v-input__slot {
  background-color: #f5f5f5 !important;
}

.v-text-field >>> .v-label,
.v-select >>> .v-label {
  color: #757575;
}

.v-text-field >>> .v-input__icon,
.v-select >>> .v-input__icon {
  color: #4caf50;
}
</style>