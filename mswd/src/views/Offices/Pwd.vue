  <template>
    <div>
      <Navbar />

      <div class="pwd-office">
        <section class="office-info">
          <h2 class="header">Persons with Disabilities (PWD) Office</h2>
          <p class="description">Welcome to the PWD Office. This office provides support and services for individuals with disabilities.</p>
          
          <button @click="openMembershipFormModal" class="action-button">Apply for Membership</button>
        </section>

        <div class="request-history-container">
          <section class="request-history">
            <h3 class="header">Request History</h3>
            <div v-if="isLoading" class="loading">Loading...</div>
            <ul v-else class="history-list">
              <li v-for="(request, index) in requestHistory" :key="index" class="request-item">
                <div class="request-details">
                  <strong>Date:</strong> {{ request.date }} |
                  <strong>Amount:</strong> {{ request.amount }} |
                  <strong>Reason:</strong> {{ request.reason }}
                </div>
                <div class="request-actions">
                  <button @click="editRequest(index)" class="action-button">Edit</button>
                  <button @click="deleteRequest(index)" class="action-button">Delete</button>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <section class="request-form-container">
          <section class="request-form">
            <h3 class="header">Request Money Form</h3>
            <button @click="openRequestModal" class="action-button">Request Money</button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </section>
        </section>

        <div class="modal" :class="{ 'is-active': isRequestModalActive }">
          <div class="modal-background" @click="closeRequestModal"></div>
          <div class="modal-content">
            <h3 class="header">Request Money</h3>
            <form @submit.prevent="submitForm" class="money-form">
              <label for="amount" class="form-label">Amount:</label>
              <input type="number" id="amount" v-model="formData.amount" required class="form-input">

              <label for="reason" class="form-label">Reason:</label>
              <textarea id="reason" v-model="formData.reason" required class="form-input"></textarea>

              <button type="submit" class="action-button">Submit Request</button>
             <button type="button" class="action-button" @click="closeRequestModal">Cancel</button>
    </form>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="closeRequestModal"></button>
</div>

        <!-- Edit Request Modal, Membership Application Modal -->
        <!-- Keeping the structure similar to minimize redundancy -->

        <div v-if="isEditModalActive || isMembershipFormModalActive" class="modal is-active">
          <div class="modal-background" @click="closeModal"></div>
          <div class="modal-content">
            <h3 class="header">{{ isEditModalActive ? 'Edit Request' : 'Membership Application' }}</h3>
            <form @submit.prevent="isEditModalActive ? updateRequest() : submitMembershipForm()" 
                  class="money-form membership-form">
              <label v-if="isEditModalActive" for="editAmount" class="form-label">Amount:</label>
              <input v-if="isEditModalActive" type="number" id="editAmount" v-model="editFormData.amount" required class="form-input">

              <label for="reason" class="form-label">{{ isEditModalActive ? 'Reason' : 'Full Name' }}:</label>
              <textarea v-if="!isEditModalActive" id="name" v-model="membershipFormData.name" required class="form-input"></textarea>
              <input v-if="isEditModalActive" type="text" id="reason" v-model="editFormData.reason" required class="form-input">
              
              <!-- Additional fields for membership application -->
              <template v-if="!isEditModalActive">
                <label for="dob" class="form-label">Date of Birth:</label>
                <input type="date" id="dob" v-model="membershipFormData.dob" required class="form-input">
                
                <label for="sickness" class="form-label">Sickness:</label>
                <input type="text" id="sickness" v-model="membershipFormData.sickness" required class="form-input">
                
                <label for="certificate" class="form-label">Copy of Certificate:</label>
                <input type="file" id="certificate" @change="handleCertificateUpload" class="form-input">
              </template>

              <button type="submit" class="action-button">{{ isEditModalActive ? 'Update Request' : 'Submit Application' }}</button>
    </form>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="closeMembershipFormModal"></button>
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
  name: 'PwdOffice',
  data() {
    return {
      formData: {
        amount: 0,
        reason: '',
      },
      editFormData: {
        amount: 0,
        reason: '',
        index: null,
      },
      membershipFormData: {
        name: '',
        dob: '',
        sickness: '',
        certificate: null,
      },
      error: null,
      requestHistory: [],
      isLoading: true,
      isRequestModalActive: false,
      isEditModalActive: false,
      isMembershipFormModalActive: false,
    };
  },
  methods: {
    submitForm() {
      axios.post('/api/req', this.formData)
        .then(response => {
          console.log(response.data);
          // Update request history with timestamp
          this.requestHistory.unshift({
            date: response.data.created_at, // Adjust property name accordingly
            amount: this.formData.amount,
            reason: this.formData.reason,
          });
          // Clear form data
          this.formData = { amount: 0, reason: '' };
          // Clear error
          this.error = null;
          // Close the modal after submission
          this.closeRequestModal();
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.error(error);
        });
    },

    updateRequest() {
      const index = this.editFormData.index;

      axios.post('/api/updateRequest', { requestId: this.requestHistory[index].id, updatedData: this.editFormData })
        .then(response => {
          console.log(response.data);
          // Update request history with timestamp
          this.requestHistory[index] = {
            date: new Date().toLocaleString(), // Update with actual date if available
            amount: this.editFormData.amount,
            reason: this.editFormData.reason,
          };
          // Clear form data
          this.editFormData = { amount: 0, reason: '', index: null };
          // Close the modal after submission
          this.closeEditModal();
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.error(error);
        });
    },

    fetchRequestHistory() {
      axios.get('/api/PWD')
        .then(response => {
          this.requestHistory = response.data;
          this.isLoading = false; // Set loading state to false when data is fetched
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false; // Set loading state to false on error
        });
    },

    deleteRequest(index) {
      const confirmDelete = confirm('Are you sure you want to delete this request?');
      if (confirmDelete) {
        const requestId = this.requestHistory[index].id; // Assuming you have an 'id' property for each request

        // Make a DELETE request to the backend
        axios.delete(`/api/deleteRequest/${requestId}`)
          .then(response => {
            console.log(response.data);
            // If deletion is successful, remove the request from the requestHistory array
            this.requestHistory.splice(index, 1);
          })
          .catch(error => {
            console.error(error);
            // Handle error here
          });
      }
    },

    editRequest(index) {
      // Set the edit form data with the selected request details for editing
      this.editFormData.amount = this.requestHistory[index].amount;
      this.editFormData.reason = this.requestHistory[index].reason;
      this.editFormData.index = index;

      // Open the edit request modal
      this.isEditModalActive = true;
    },

    openRequestModal() {
      // Open the request money modal
      this.isRequestModalActive = true;
    },

    closeRequestModal() {
      // Close the request money modal
      this.isRequestModalActive = false;
    },

    closeEditModal() {
      // Close the edit request modal
      this.isEditModalActive = false;
    },

    openMembershipFormModal() {
      // Open the membership form modal
      this.isMembershipFormModalActive = true;
    },

    closeMembershipFormModal() {
      // Close the membership form modal
      this.isMembershipFormModalActive = false;
    },

    submitMembershipForm() {
      // Implement form submission logic here
      // You can use axios to send the form data to the backend
      // Handle success and error cases accordingly
    },
    
    handleCertificateUpload(event) {
      // Handle file upload for the certificate
      const file = event.target.files[0];
      this.membershipFormData.certificate = file;
    }
  },
  mounted() {
    // Fetch request history when the component is mounted
    this.fetchRequestHistory();
  },
};
</script>


<style scoped>
/* Modernized Styles */

/* General Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f2f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.header {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

/* Office Info */
.office-info {
  background-color: #fff;
  border-radius: 10px;
  padding: 10%;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}

/* Buttons */
.action-button {
  padding: 10px 20px;
  background-color: #336699;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #254e77;
}

/* Request History */
.request-history-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.request-history {
  margin-bottom: 20px;
}

.request-item {
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
}

.request-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request-actions {
  display: flex;
}

.request-actions button {
  margin-left: 10px;
}

/* Forms */
.money-form,
.membership-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.form-label {
  margin-bottom: 10px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal.is-active {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .modal-content {
    width: 90%;
  }
}
</style>