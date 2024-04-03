<template>
  <div class="login-container">
    <div class="background">
      <div class="background-color" style="background-color: #e0f2f1;"></div>
    </div>

    <h2 class="text-center">Login</h2>
    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>

    <div class="mswd">MSWD</div>
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
  background-color: rgb(7, 66, 46);
  color: #fff;
  margin: 100px auto;
  padding: 4rem 50px 0rem; /* Adjusted padding for top, sides, and bottom */
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; /* Needed for absolute positioning of MSWD text */
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
}

label {
  width: 120px;
  font-weight: normal;
  text-align: right;
    color: #fff;
}

input[type="text"],
input[type="password"] {
  flex: 1 1 auto;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.3s ease;
  font-size: 1rem;
    color: #fff;
}

.btn {
  background-color: #4CAF50; /* Green primary button */
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
}

.btn:hover {
  background-color: #3e8e41; /* Darker green on hover */
}

.mswd {
  text-align: center; /* Center MSWD text */
  margin-top: 1rem; /* Add some space above MSWD */
  font-size: 0.8rem; /* Slightly smaller font for MSWD */
  color: #999; /* Lighter gray for MSWD */
}

</style>
