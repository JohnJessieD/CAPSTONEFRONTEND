<template>
  <div class="app-wrapper">
    <!-- Navigation Bar -->
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
        <router-link to="/SchedulePWD" class="nav-link">Schedule</router-link>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </nav>

    <div class="spacer"></div>
    <main class="main-content">
      <h1 class="page-title">Persons with Disabilities (PWD) Office</h1>
      
      <div class="pwd-office">
        <section class="office-info">
          <h2 class="section-title">Welcome to the PWD Office</h2>
          <p class="description">This office provides support and services for individuals with disabilities. We're here to assist you with various needs and ensure your well-being.</p>
          <div class="button-group">
            <button @click="openModal('membership')" class="btn btn-primary">
              <span class="icon">📋</span> Apply for Membership
            </button>
            <button @click="openModal('assistance')" class="btn btn-secondary">
              <span class="icon">💰</span> Request Assistance
            </button>
          </div>
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
                <div class="request-info">
                  <span :class="['request-status', request.status.toLowerCase()]">
                    {{ request.status }}
                  </span>
                  <span class="request-amount">₱{{ request.amount.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="no-requests">You haven't made any requests yet.</p>
        </section>
      </div>

      <section class="faq-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <button 
              @click="toggleFaq(index)" 
              class="faq-question" 
              :aria-expanded="faq.isOpen" 
              :aria-controls="'faq-answer-' + index"
            >
              {{ faq.question }}
              <span class="faq-icon">{{ faq.isOpen ? '−' : '+' }}</span>
            </button>
            <div 
              :id="'faq-answer-' + index" 
              v-show="faq.isOpen" 
              class="faq-answer"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <div v-if="showWelcomeNotification" class="notification welcome-notification">
      <h3 class="welcome-title">Welcome to MSWD Assistance!</h3>
      <p class="welcome-message">We're here to help you with your needs. Here's how to get started:</p>
      <ol class="welcome-instructions">
        <li>Choose an option below based on your needs.</li>
        <li>Fill out the required information in the form.</li>
        <li>Submit your application or request.</li>
        <li>Track your request status in the "Request History" section.</li>
      </ol>
      <button @click="closeWelcomeNotification" class="close-notification" aria-label="Close notification">&times;</button>
    </div>

    <div v-if="isModalActive" class="modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-container">
        <button @click="closeModal" class="modal-close" aria-label="Close modal">&times;</button>
        <h2 class="modal-title">{{ modalTitle }}</h2>
        <form @submit.prevent="submitForm" class="dynamic-form">
          <template v-if="activeForm === 'membership'">
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input type="text" id="name" v-model="formData.name" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="address" class="form-label">Address</label>
              <textarea id="address" v-model="formData.address" required class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="dob" class="form-label">Date of Birth</label>
              <input type="date" id="dob" v-model="formData.dob" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="sickness" class="form-label">Disability or Medical Condition</label>
              <input type="text" id="sickness" v-model="formData.sickness" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="category" class="form-label">Category</label>
              <select id="category" v-model="formData.category" required class="form-input">
                <option value="" disabled>Select a category</option>
                <option value="Senior">Senior</option>
                <option value="PWD">PWD</option>
                <option value="Solo Parent">Solo Parent</option>
              </select>
            </div>
            <div class="form-group">
              <label for="certificate" class="form-label">Copy of Certificate</label>
              <input type="file" id="certificate" @change="handleFileUpload" required class="form-input file-input" accept="image/*,.pdf" />
            </div>
          </template>

          <template v-if="activeForm === 'assistance'">
            <div class="form-group">
              <label for="fullName" class="form-label">Full Name</label>
              <input type="text" id="fullName" v-model="formData.fullName" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="idNumber" class="form-label">ID Number</label>
              <input type="text" id="idNumber" v-model="formData.idNumber" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="address" class="form-label">Address</label>
              <textarea id="address" v-model="formData.address" required class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="formData.email" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="reason" class="form-label">Reason for Request</label>
              <textarea id="reason" v-model="formData.reason" required class="form-input" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label for="amount" class="form-label">Amount Requested (PHP)</label>
              <input type="number" id="amount" v-model="formData.amount" required class="form-input" min="0" step="100" />
            </div>
          </template>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const formData = ref({
  name: '',
  idNumber: '',
  phoneNumber: '',
  address: '',
  dob: '',
  sickness: '',
  category: '',
  certificate: null,
  email: '',
  reason: '',
  amount: 0,
})

const error = ref(null)
const requestHistory = ref([])
const isLoading = ref(true)
const isModalActive = ref(false)
const activeForm = ref('')
const showWelcomeNotification = ref(true)

const faqs = ref([
  {
    question: "Who is eligible for PWD assistance?",
    answer: "Individuals with permanent disabilities recognized by the government are eligible for PWD assistance.",
    isOpen: false
  },
  {
    question: "What documents do I need to apply for a PWD ID?",
    answer: "You'll need a medical certificate from a licensed physician, barangay certificate, and valid ID. Additional requirements may vary by location.",
    isOpen: false
  },
  {
    question: "How long does it take to process a PWD ID application?",
    answer: "Processing time varies, but it typically takes 2-4 weeks. You'll be notified when your ID is ready for pickup.",
    isOpen: false
  },
  {
    question: "What benefits do PWD cardholders receive?",
    answer: "Benefits include discounts on medical supplies, transportation, and some goods and services. Specific benefits may vary by location and establishment.",
    isOpen: false
  },
  {
    question: "How often do I need to renew my PWD ID?",
    answer: "PWD IDs are typically valid for 3 years. You should start the renewal process at least a month before the expiration date.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

const modalTitle = computed(() => {
  return activeForm.value === 'membership' ? 'Membership Application' : 'Request Financial Assistance'
})

const openModal = (formType) => {
  activeForm.value = formType
  isModalActive.value = true
  showWelcomeNotification.value = false
}

const closeModal = () => {
  isModalActive.value = false
  formData.value = {
    name: '',
    phoneNumber: '',
    address: '',
    dob: '',
    sickness: '',
    category: '',
    certificate: null,
    email: '',
    reason: '',
    amount: 0,
  }
  error.value = null
}

const closeWelcomeNotification = () => {
  showWelcomeNotification.value = false
}

const submitForm = async () => {
  try {
    let response
    if (activeForm.value === 'membership') {
      const membershipFormData = new FormData()
      for (const key in formData.value) {
        if (key !== 'certificate') {
          membershipFormData.append(key, formData.value[key])
        }
      }
      if (formData.value.certificate) {
        membershipFormData.append('certificate', formData.value.certificate)
      }
      response = await axios.post('/api/membership', membershipFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      response = await axios.post('/api/req', {
        fullName: formData.value.fullName,
        idNumber: formData.value.idNumber,
        phoneNumber: formData.value.phoneNumber,
        address: formData.value.address,
        email: formData.value.email,
        reason: formData.value.reason,
        amount: formData.value.amount,
      })
      requestHistory.value.unshift({
        date: new Date(),
        fullName: formData.value.fullName,
        idNumber: formData.value.idNumber,
        phoneNumber: formData.value.phoneNumber,
        address: formData.value.address,
        email: formData.value.email,
        reason: formData.value.reason,
        amount: formData.value.amount,
        status: 'Pending',
      })
    }
    console.log(response.data)
    closeModal()
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred while submitting the form.'
    console.error(err)
  }
}

const fetchRequestHistory = async () => {
  try {
    const response = await axios.get('/api/PWD')
    requestHistory.value = response.data.map(request => ({
      ...request,
      status: request.status || 'Pending',
    }))
    isLoading.value = false
  } catch (err) {
    console.error(err)
    isLoading.value = false
    error.value = 'Failed to load request history.'
  }
}

const handleFileUpload = (event) => {
  formData.value.certificate = event.target.files[0]
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

const logout = async () => {
  try {
    // Call logout API endpoint
    await axios.post('/api/logout')
    // Clear local storage or any client-side stored data
    localStorage.removeItem('user')
    // Redirect to login page
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
    // Handle logout error (e.g., show an error message to the user)
  }
}

onMounted(() => {
  fetchRequestHistory()
})
</script>

<style scoped>
.app-wrapper {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
  color: #333;
}

.navbar {
  background-color: #ffffff;
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

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c82333;
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
}

.pwd-office {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.office-info, .request-history {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.office-info:hover, .request-history:hover {
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

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
}

.btn-primary {
  background-color: #004d7a;
  color: white;
}

.btn-primary:hover {
  background-color: #003a5c;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
  transform: translateY(-2px);
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
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

.request-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.request-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.request-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.spacer {
  height: 100px;
}

.modal-close:hover {
  color: #333;
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
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #004d7a;
  box-shadow: 0 0 0 3px rgba(0, 77, 122, 0.1);
}

.file-input {
  padding: 0.5rem 0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
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

.icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #004d7a;
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 400px;
  width: 100%;
  animation: slideIn 0.5s ease-out;
}

.welcome-notification {
  background-color: #004d7a;
  border-left: 5px solid #28a745;
}

.welcome-title {
  color: #ffffff;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.welcome-message {
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.welcome-instructions {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  color: #e6f7ff;
}

.welcome-instructions li {
  margin-bottom: 0.5rem;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-notification {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close-notification:hover {
  transform: scale(1.1);
}

.faq-section {
  margin-top: 3rem;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.faq-list {
  display: grid;
  gap: 1rem;
}

.faq-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-question {
  width: 100%;
  text-align: left;
  padding: 1rem;
  background-color: #f0f4f8;
  border: none;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #e0e7ef;
}

.faq-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-question[aria-expanded="true"] .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 1rem;
  background-color: white;
  line-height: 1.6;
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
    padding: 1.5rem;
    max-height: 80vh;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .request-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .notification {
    max-width: none;
    width: calc(100% - 40px);
    left: 20px;
    right: 20px;
  }
}
</style>