<template>
   <Navbar />
  <div class="container">
   
    <h2>Solo Parent Office</h2>
    <p>Welcome to the Solo Parent Office. This office supports single parents by offering resources and services.</p>
    <div class="services">
      <p>Services and Features:</p>
      <ul>
        <li>Financial assistance programs</li>
        <li>Parenting workshops</li>
        <li>Legal support</li>
        <li>Healthcare services</li>
        <li>Networking events</li>
      </ul>
    </div>

    <!-- Form for Cash Assistance Cash Subsidy -->
    <form class="application-form" @submit.prevent="validateAndApply">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="applicantName" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="applicantEmail" required>
      </div>

      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <textarea id="address" v-model="address" required></textarea>
      </div>

      <div class="form-group">
        <label for="numberOfChildren">Number of Children:</label>
        <input type="number" id="numberOfChildren" v-model="numberOfChildren" required>
      </div>

      <div class="form-group">
        <label for="incomeProof">Proof of Income:</label>
        <input type="file" id="incomeProof" accept="image/*, application/pdf" @change="handleFileUpload">
      </div>

      <!-- Additional fields can be added as necessary -->

      <button type="submit" class="submit-button">Apply for Cash Assistance</button>
    </form>

    <!-- Modal for Eligibility Confirmation -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Confirm Eligibility</h3>
        <p>Before proceeding, please confirm that you meet the eligibility criteria for cash assistance cash subsidy.</p>
        <ul>
          <li v-for="criterion in eligibilityCriteria">{{ criterion }}</li>
        </ul>
        <button @click="proceedWithApplication" class="proceed-button">Proceed with Application</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      applicantName: '',
      applicantEmail: '',
      phoneNumber: '',
      address: '',
      numberOfChildren: 0,
      incomeProof: null, // File upload for income proof
      showModal: false,
      eligibilityCriteria: [
        "You are a solo parent according to the criteria outlined in RA 8972.",
        "You have all the necessary documents as per Step 2 of the application process."
      ]
    };
  },
  methods: {
    validateAndApply() {
      // Implement validation logic here
      // For simplicity, assuming validation is always successful
      this.showModal = true;
    },
    handleFileUpload(event) {
      // Handle file upload for income proof
      this.incomeProof = event.target.files[0];
    },
    proceedWithApplication() {
      // Implement application submission logic here
      alert('Your application has been submitted successfully.');
      this.showModal = false;
      // Reset form fields
      this.applicantName = '';
      this.applicantEmail = '';
      this.phoneNumber = '';
      this.address = '';
      this.numberOfChildren = 0;
      this.incomeProof = null;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
/* CSS for modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.services {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="file"] {
  margin-top: 5px;
}

.submit-button,
.proceed-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover,
.proceed-button:hover {
  background-color: #45a049;
}

</style>
