<template>
  <div>
    <Navbar />
    <div class="container">
      <h2 class="section-title">Solo Parent Office</h2>
      <p class="section-description">Welcome to the Solo Parent Office. This office supports single parents by offering resources and services.</p>

      <div class="instructional-materials">
        <p class="materials-title">Available Instructional Materials:</p>
        <div v-for="material in instructionalMaterials" :key="material.id">
          <button class="instructional-button" @click="showInstructionalMaterial(material)">
            {{ material.title }}
          </button>
        </div>
      </div>

      <!-- Form for Cash Assistance Cash Subsidy -->
      <form class="application-form" @submit.prevent="validateAndApply">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="applicantName" placeholder="Enter your name" required>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="applicantEmail" placeholder="Enter your email" required>
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" v-model="phoneNumber" placeholder="Enter your phone number" required>
        </div>

        <div class="form-group">
          <label for="address">Address:</label>
          <textarea id="address" v-model="address" placeholder="Enter your address" required></textarea>
        </div>

        <div class="form-group">
          <label for="numberOfChildren">Number of Children:</label>
          <input type="number" id="numberOfChildren" v-model="numberOfChildren" placeholder="Enter number of children" required>
        </div>

        <div class="form-group">
          <label for="incomeProof">Proof of Income:</label>
          <input type="file" id="incomeProof" accept="image/*, application/pdf" @change="handleFileUpload">
        </div>

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

      <!-- Display area for instructional materials -->
      <div v-if="showInstructional" class="instructional-content">
        <h3>{{ instructionalTitle }}</h3><br>
        <p>{{ instructionalContent }}</p><br>
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
      ],
      showInstructional: false,
      instructionalTitle: '',
      instructionalContent: '',
      instructionalMaterials: [
        {
          id: 1,
          title: "Daycare Instructional Material",
          content: "Content for daycare instructional material goes here..."
        },
        {
          id: 2,
          title: "Elementary Instructional Material",
          content: "Content for elementary instructional material goes here..."
        }
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
    },
    showInstructionalMaterial(material) {
      this.instructionalTitle = material.title;
      this.instructionalContent = material.content;
      this.showInstructional = true;
    }
  }
};
</script>

<style scoped>  .spacer {
  height: 100px; /* Adjust the height for desired spacing */
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 10%;
}

.section-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.section-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.submit-button,
.instructional-button,
.proceed-button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover,
.instructional-button:hover,
.proceed-button:hover {
  background-color: #2980b9;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%;
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

.instructional-content {
  margin-top: 20px;
}

.instructional-content h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.instructional-content p {
  color: #555;
  font-size: 16px;  
}
</style>
