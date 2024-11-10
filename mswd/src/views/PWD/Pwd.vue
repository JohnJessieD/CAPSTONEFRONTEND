<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/temlpatep" class="nav-link">Home</router-link>
        <router-link to="/Pwd" class="nav-link">Assistance</router-link>
        <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
        <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
        
        <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
      </div>
    </nav>
    <div class="spacer"></div>

    <main class="main-content">
      <h1 class="page-title">Persons with Disabilities (PWD) Office</h1>
      
      <div class="pwd-office">
        <section class="office-info">
          <h2 class="section-title">Welcome to the PWD Office</h2>
          <p class="description">This office provides support and services for individuals with disabilities. We're here to assist you with various needs and ensure your well-being.</p>
          <button @click="openMembershipFormModal" class="action-button">
            <span class="icon">📋</span> Apply for Membership
          </button>
        </section>

        <section class="request-money">
          <h2 class="section-title">Request Financial Assistance</h2>
          <p class="description">If you need financial support, you can submit a request here. We'll review your application and get back to you as soon as possible.</p>
          <button @click="openRequestModal" class="action-button">
            <span class="icon">💰</span> Make a Request
          </button>
        </section>

        <section class="request-history">
          <h2 class="section-title">Request History</h2>
          <div v-if="isLoading" class="loading">
            <div class="loading-spinner"></div>
            <p>Loading your request history...</p>
          </div>
          <div v-else-if="requestHistory.length > 0" class="request-list">
            <div v-for="(request, index) in requestHistory" :key="index" class="request-item">
              <div class="request-details">
                <span class="request-date">{{ formatDate(request.date) }}</span>
                <p class="request-reason">{{ request.reason }}</p>
                <span class="request-status" :class="request.status.toLowerCase()">{{ request.status }}</span>
                <span class="request-amount">₱{{ request.amount.toLocaleString() }}</span>
              </div>
              <div class="request-actions">
                <button @click="editRequest(index)" class="action-button edit-button" :disabled="request.status !== 'Pending'">
                  <span class="icon">✏️</span> Edit
                </button>
                <button @click="deleteRequest(index)" class="action-button delete-button" :disabled="request.status !== 'Pending'">
                  <span class="icon">🗑️</span> Delete
                </button>
              </div>
            </div>
          </div>
          <p v-else class="no-requests">You haven't made any requests yet.</p>
        </section>
      </div>
    </main>

    <!-- Membership Application Modal -->
    <div v-if="isMembershipFormModalActive" class="modal">
      <div class="modal-overlay" @click="closeMembershipFormModal"></div>
      <div class="modal-container">
        <h2 class="modal-title">Membership Application</h2>
        <form @submit.prevent="submitMembershipForm" class="membership-form">
          <div class="form-group">
            <label for="name" class="form-label">Full Name:</label>
            <input type="text" id="name" v-model="membershipFormData.name" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label for="dob" class="form-label">Date of Birth:</label>
            <input type="date" id="dob" v-model="membershipFormData.dob" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label for="sickness" class="form-label">Disability or Medical Condition:</label>
            <input type="text" id="sickness" v-model="membershipFormData.sickness" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label for="category" class="form-label">Category:</label>
            <select id="category" v-model="membershipFormData.category" required class="form-input">
              <option value="" disabled>Select a category</option>
              <option value="Senior">Senior</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Address:</label>
            <textarea id="address" v-model="membershipFormData.address" required class="form-input" rows="3"></textarea>
          </div>
          
          <div class="form-group">
            <label for="certificate" class="form-label">Copy of Certificate:</label>
            <input type="file" id="certificate" @change="handleCertificateUpload" required class="form-input file-input" accept="image/*,.pdf" />
          </div>

          <div class="form-actions">
            <button type="submit" class="action-button submit-button">
              <span class="icon">📤</span> Submit Application
            </button>
            <button type="button" class="action-button cancel-button" @click="closeMembershipFormModal">
              <span class="icon">❌</span> Cancel
            </button>
          </div>
        </form>
        <p v-if="membershipError" class="error-message">{{ membershipError }}</p>
      </div>
    </div>

    <!-- Request Money Modal -->
    <div v-if="isRequestModalActive" class="modal">
      <div class="modal-overlay" @click="closeRequestModal"></div>
      <div class="modal-container">
        <h2 class="modal-title">Request Financial Assistance</h2>
        <form @submit.prevent="submitForm" class="money-form">
          <div class="form-group">
            <label for="reason" class="form-label">Reason for Request:</label>
            <textarea id="reason" v-model="formData.reason" required class="form-input" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="amount" class="form-label">Amount Requested (PHP):</label>
            <input type="number" id="amount" v-model="formData.amount" required class="form-input" min="0" step="100" />
          </div>
          <div class="form-actions">
            <button type="submit" class="action-button submit-button">
              <span class="icon">📤</span> Submit Request
            </button>
            <button type="button" class="action-button cancel-button" @click="closeRequestModal">
              <span class="icon">❌</span> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Request Modal -->
    <div v-if="isEditModalActive" class="modal">
      <div class="modal-overlay" @click="closeEditModal"></div>
      <div class="modal-container">
        <h2 class="modal-title">Edit Request</h2>
        <form @submit.prevent="updateRequest" class="edit-form">
          <div class="form-group">
            <label for="edit-reason" class="form-label">Reason:</label>
            <textarea id="edit-reason" v-model="editFormData.reason" required class="form-input" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="edit-amount" class="form-label">Amount Requested (PHP):</label>
            <input type="number" id="edit-amount" v-model="editFormData.amount" required class="form-input" min="0" step="100" />
          </div>
          <div class="form-actions">
            <button type="submit" class="action-button submit-button">
              <span class="icon">💾</span> Update Request
            </button>
            <button type="button" class="action-button cancel-button" @click="closeEditModal">
              <span class="icon">❌</span> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const formData = ref({
  reason: '',
  amount: 0,
})

const editFormData = ref({
  reason: '',
  amount: 0,
  index: null,
})

const membershipFormData = ref({
  name: '',
  dob: '',
  sickness: '',
  category: '',
  address: '',
  certificate: null,
})

const error = ref(null)
const requestHistory = ref([])
const isLoading = ref(true)
const isRequestModalActive = ref(false)
const isEditModalActive = ref(false)
const isMembershipFormModalActive = ref(false)
const membershipError = ref(null)

const submitForm = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    requestHistory.value.unshift({
      date: new Date(),
      reason: formData.value.reason,
      amount: formData.value.amount,
      status: 'Pending',
    })
    formData.value = { reason: '', amount: 0 }
    error.value = null
    closeRequestModal()
  } catch (err) {
    error.value = 'An error occurred while submitting the request.'
    console.error(err)
  }
}

const fetchRequestHistory = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    requestHistory.value = [
      { id: 1, date: new Date('2023-05-01'), reason: 'Medical expenses', amount: 5000, status: 'Approved' },
      { id: 2, date: new Date('2023-05-15'), reason: 'Assistive device', amount: 10000, status: 'Pending' },
      { id: 3, date: new Date('2023-06-01'), reason: 'Rehabilitation', amount: 7500, status: 'Rejected' },
    ]
    isLoading.value = false
  } catch (err) {
    console.error(err)
    isLoading.value = false
    error.value = 'Failed to load request history.'
  }
}

const updateRequest = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const index = editFormData.value.index
    requestHistory.value[index] = {
      ...requestHistory.value[index],
      reason: editFormData.value.reason,
      amount: editFormData.value.amount,
    }
    editFormData.value = { reason: '', amount: 0, index: null }
    closeEditModal()
  } catch (err) {
    error.value = 'Failed to update the request.'
    console.error(err)
  }
}

const deleteRequest = async (index) => {
  const confirmDelete = confirm('Are you sure you want to delete this request?')
  if (confirmDelete) {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      requestHistory.value.splice(index, 1)
    } catch (err) {
      console.error(err)
      error.value = 'Failed to delete the request.'
    }
  }
}

const openRequestModal = () => {
  isRequestModalActive.value = true
}

const closeRequestModal = () => {
  isRequestModalActive.value = false
  formData.value = { reason: '', amount: 0 }
  error.value = null
}

const editRequest = (index) => {
  editFormData.value = { 
    reason: requestHistory.value[index].reason, 
    amount: requestHistory.value[index].amount,
    index 
  }
  isEditModalActive.value = true
}

const closeEditModal = () => {
  isEditModalActive.value = false
  editFormData.value = { reason: '', amount: 0, index: null }
}

const openMembershipFormModal = () => {
  isMembershipFormModalActive.value = true
}

const closeMembershipFormModal = () => {
  isMembershipFormModalActive.value = false
  membershipFormData.value = { 
    name: '', 
    dob: '', 
    sickness: '', 
    category: '',
    address: '',
    certificate: null 
  }
  membershipError.value = null
}

const submitMembershipForm = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Membership form submitted:', membershipFormData.value)
    membershipFormData.value = { 
      name: '', 
      dob: '', 
      sickness: '', 
      category: '',
      address: '',
      certificate: null 
    }
    closeMembershipFormModal()
  } catch (err) {
    membershipError.value = 'An unexpected error occurred. Please try again.'
    console.error(err)
  }
}

const handleCertificateUpload = (event) => {
  membershipFormData.value.certificate = event.target.files[0]
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchRequestHistory()
})
</script>

<style scoped>
/* The CSS styles remain unchanged */
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
}

.navbar {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.brand-text {
  color: #004d7a;
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #f0f4f8;
  color: #004d7a;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #004d7a;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.pwd-office {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.office-info, .request-money, .request-history {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.office-info:hover, .request-money:hover, .request-history:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.75rem;
  color: #004d7a;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #004d7a;
  padding-bottom: 0.5rem;
}

.description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #004d7a;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-button:hover {
  background-color: #003a5c;
  transform: translateY(-2px);
}

.action-button:active {
  transform: translateY(0);
}

.request-list {
  display: grid;
  gap: 1rem;
}

.request-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.request-item:hover {
  background-color: #e9ecef;
}

.request-date {
  font-size: 0.9rem;
  color: #6c757d;
  display: block;
  margin-bottom: 0.5rem;
}

.request-reason {
  margin: 0.5rem 0;
  color: #333;
  font-weight: 500;
}

.request-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.request-status.pending {
  background-color: #ffc107;
  color: #000;
}

.request-status.approved {
  background-color: #28a745;
  color: #fff;
}

.request-status.rejected {
  background-color: #dc3545;
  color: #fff;
}

.request-amount {
  font-weight: bold;
  color: #004d7a;
}

.request-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-button, .delete-button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.edit-button {
  background-color: #4caf50;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #da190b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 2rem;
  color: #004d7a;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #004d7a;
}

.file-input {
  padding: 0.5rem 0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.submit-button, .cancel-button {
  flex: 1;
  margin: 0 0.5rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.loading {
  text-align: center;
  color: #666;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #004d7a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-requests {
  text-align: center;
  color: #666;
  font-style: italic;
}

.spacer {
  width: 100%;
  height: 50px;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    margin-bottom: 0.5rem;
  }

  .pwd-office {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2rem;
  }

  .modal-container {
    width: 95%;
    padding: 2rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .submit-button, .cancel-button {
    margin: 0;
  }
}
</style>