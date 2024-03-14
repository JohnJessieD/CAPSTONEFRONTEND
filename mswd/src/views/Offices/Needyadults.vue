<template> <Navbar />
  <div class="container">
   
    <h2>Welcome to the Needy Adult Office</h2>
    <p>This office provides support for adults in need.</p>
    <button @click="openModal" class="button">Open Form</button> <!-- Button to open the modal -->
    <Modal v-if="showModal" @close="closeModal" class="modal">
      <!-- Main Form -->
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required class="input-field">
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="formData.age" required class="input-field">
        </div> 
        <div class="form-group">
          <label for="contact">Contact Number:</label>
          <input type="text" id="contact" v-model="formData.contact" required class="input-field">
        </div>
        <div class="form-group checkbox-group">
          <label for="allowance" class="checkbox-label">Are you seeking financial support?</label>
          <input type="checkbox" id="allowance" v-model="formData.allowanceRequest" @change="handleAllowanceChange" class="checkbox">
        </div>
        <!-- Medication Requests -->
        <div class="form-group checkbox-group">
          <label for="medication" class="checkbox-label">Do you need assistance with medication?</label>
          <input type="checkbox" id="medication" v-model="formData.medicationRequest" @change="handleMedicationChange" class="checkbox">
        </div>
        <!-- Additional Fields for Medication Request -->
        <div v-if="showMedicationFields" class="medication-form">
          <h3>Medication Request Form</h3>
          <div class="form-group">
            <label for="medicineType">Type of Medicine:</label>
            <input type="text" id="medicineType" v-model="medicationFormData.medicineType" required class="input-field">
          </div>
          <div class="form-group">
            <label for="purpose">Purpose:</label>
            <input type="text" id="purpose" v-model="medicationFormData.purpose" required class="input-field">
          </div>
          <div class="form-group file-upload">
            <label for="medicalCertificate" class="upload-label">Upload Medical Certificate:</label>
            <input type="file" id="medicalCertificate" accept="image/*" @change="handleMedicalCertificateChange" required class="file-input">
          </div>
          <div class="form-group file-upload">
            <label for="proofOfReceipt" class="upload-label">Upload Proof of Receipt:</label>
            <input type="file" id="proofOfReceipt" accept="image/*" @change="handleProofOfReceiptChange" required class="file-input">
          </div>
        </div>
      </form>
      <button @click="submitForm" class="submit-btn">Submit</button>
      <!-- Senior Verification Form -->
      <form v-if="showSeniorVerification" @submit.prevent="submitSeniorVerification" class="senior-verification-form">
        <h3>Senior Verification</h3>
        <p>Please upload a photo of your senior ID.</p>
        <div class="form-group file-upload">
          <label for="seniorId" class="upload-label">Upload Senior ID:</label>
          <input type="file" id="seniorId" accept="image/*" @change="handleFileChange" required class="file-input">
        </div>
        <button type="submit" class="submit-btn">Submit Senior Verification</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  name: 'NeedyAdultOffice',
  data() {
    return {
      formData: {
        name: '',
        age: null,
        contact: '',
        allowanceRequest: false,
        medicationRequest: false,
      },
      medicationFormData: {
        medicineType: '',
        purpose: '',
        medicalCertificate: null,
        proofOfReceipt: null,
      },
      showModal: false,
      showSeniorVerification: false,
      showMedicationFields: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.showSeniorVerification = false; // Close senior verification form if open
    },
    handleAllowanceChange() {
      if (this.formData.allowanceRequest && this.formData.age < 60) {
        this.showSeniorVerification = true;
      } else {
        this.showSeniorVerification = false;
      }
    },
    handleMedicationChange() {
      if (this.formData.medicationRequest) {
        this.showMedicationFields = true;
      } else {
        this.showMedicationFields = false;
      }
    },
    submitForm() {
      // Main form submission logic
      // Handle allowanceRequest and medicationRequest here
      // Close the modal
      this.closeModal();
      // You can add additional logic here for submitting main form data if needed
    },
    submitSeniorVerification() {
      // Senior verification form submission logic
      // Close the senior verification form
      this.showSeniorVerification = false;
      // Additional logic can be added here if needed
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      // You can do further processing here if needed
    },
    handleMedicalCertificateChange(event) {
      const file = event.target.files[0];
      // You can do further processing here if needed
      this.medicationFormData.medicalCertificate = file;
    },
    handleProofOfReceiptChange(event) {
      const file = event.target.files[0];
      // You can do further processing here if needed
      this.medicationFormData.proofOfReceipt = file;
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  padding: 20px;
  text-align: center;
}

.modal {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.input-field,
.checkbox,
.file-input {
  width: calc(100% - 24px);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  font-size: 16px;
  color: #333;
  margin-right: 10px;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.medication-form,
.senior-verification-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.upload-label {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.file-upload {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
