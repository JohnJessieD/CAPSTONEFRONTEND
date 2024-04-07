<template>
   <AdminNav />
    <div class="profile-entry">
     
      <div class="form-container">
        <h1>Add Profile</h1>
        <form @submit.prevent="submitProfile" class="profile-form">
          <div class="form-group">
            <label for="role">Select Role:</label>
            <select id="role" v-model="profile.role" required @change="updateFields">
              <option value="">Select Role</option>
              <option value="PWD">PWD (Person with Disability)</option>
              <option value="Solo Parent">Solo Parent</option>
              <option value="Daycare Worker">Daycare Worker</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="profile.name" required>
          </div>
          
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" v-model="profile.age" required>
          </div>
          
          <div v-if="profile.role === 'PWD'" class="form-group">
            <label for="disabilityType">Disability Type:</label>
            <input type="text" id="disabilityType" v-model="profile.disabilityType" required>
          </div>
          
          <div v-if="profile.role === 'Solo Parent'" class="form-group">
            <label for="childrenCount">Number of Children:</label>
            <input type="number" id="childrenCount" v-model="profile.childrenCount" required>
          </div>
  
          <div v-if="profile.role === 'Daycare Worker'" class="form-group">
            <label for="daycareCenter">Daycare Center:</label>
            <input type="text" id="daycareCenter" v-model="profile.daycareCenter" required>
          </div>
  
          <div v-if="profile.role === 'Senior Citizen'" class="form-group">
            <label for="retirementDate">Retirement Date:</label>
            <input type="date" id="retirementDate" v-model="profile.retirementDate" required>
          </div>
          
          <div v-if="profile.role === 'Other'" class="form-group">
            <label for="otherDetails">Other Details:</label>
            <textarea id="otherDetails" v-model="profile.otherDetails" required></textarea>
          </div>
  
          <button type="submit" class="submit-button">Add Profile</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNav from './AdminNav.vue';
  
  export default {
    name: 'ProfileEntry',
    components: {
      AdminNav
    },
    data() {
      return {
        profile: {
          role: '',
          name: '',
          age: 0,
          disabilityType: '',
          childrenCount: 0,
          daycareCenter: '',
          retirementDate: '',
          otherDetails: ''
        }
      };
    },
    methods: {
      updateFields() {
        // Reset additional fields when role changes
        this.profile.disabilityType = '';
        this.profile.childrenCount = 0;
        this.profile.daycareCenter = '';
        this.profile.retirementDate = '';
        this.profile.otherDetails = '';
      },
      submitProfile() {
        // Here you would handle the submission of the profile to your backend
        // For simplicity, we'll just log the submitted profile data
        console.log('Submitted Profile:', this.profile);
        
        // After submission, you may want to clear the form fields
        this.profile = {
          role: '',
          name: '',
          age: 0,
          disabilityType: '',
          childrenCount: 0,
          daycareCenter: '',
          retirementDate: '',
          otherDetails: ''
        };
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  .profile-entry {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9; /* Light background color */
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
  
  .profile-form {
    display: grid;
    gap: 20px;
  }
  
  .form-group {
    position: relative;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #4CAF50; /* Green focus color */
  }
  
  .submit-button {
    background-color: #4CAF50; /* Green submit button */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #45a049; /* Darker green on hover */
  }
  </style>
  