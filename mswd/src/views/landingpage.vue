<template>
  <div class="mswd-container">
    <div class="mswd-content">
      <div class="mswd-card">
        <h1 class="mswd-title">Welcome to MSWD</h1>
        <p class="mswd-subtitle">Empowering communities, one step at a time</p>
        <div class="mswd-buttons">
          <router-link to="/registercomponent" class="mswd-button mswd-button-primary">
            <span class="mswd-icon">+</span>
            Register
          </router-link>
          <router-link to="/login" class="mswd-button mswd-button-secondary">
            <span class="mswd-icon">→</span>
            Login
          </router-link>
        </div>
        <div class="mswd-divider"></div>
        <div class="mswd-services">
          <div class="mswd-service" v-for="service in services" :key="service.title">
            <div class="mswd-service-icon" :class="service.icon"></div>
            <h3 class="mswd-service-title">{{ service.title }}</h3>
            <p class="mswd-service-description">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mswd-image">
      <div class="mswd-image-overlay">
        <h2 class="mswd-image-title">Our Mission</h2>
        <p class="mswd-image-description">
          To provide comprehensive social welfare and development services to empower individuals, families, and communities.
        </p>
      </div>
    </div>
    <button class="mswd-feedback-button" @click="openFeedback">
      <span class="mswd-feedback-icon">!</span>
      Feedback
    </button>
    <button class="mswd-feedback-button" @click="openFeedback">
      <span class="mswd-feedback-icon">!</span>
      Feedback
    </button>

    <!-- Privacy-Focused Feedback Modal -->
    <div v-if="showFeedbackModal" class="mswd-modal-overlay" @click="closeFeedback">
      <div class="mswd-modal" @click.stop>
        <h2 class="mswd-modal-title">Provide Feedback</h2>
        <p class="mswd-modal-description">Your privacy is important to us. We do not collect any personal information with this feedback.</p>
        <form @submit.prevent="submitFeedback" class="mswd-feedback-form">
          <div class="mswd-form-group">
            <label for="category">Category:</label>
            <select id="category" v-model="feedbackForm.category" required>
              <option value="">Select a category</option>
              <option value="general">General Feedback</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="mswd-form-group">
            <label for="message">Feedback:</label>
            <textarea id="message" v-model="feedbackForm.message" required></textarea>
          </div>
          <div class="mswd-form-group">
            <label>
              <input type="checkbox" v-model="feedbackForm.termsAccepted" required>
              I agree that this feedback does not contain any personal or sensitive information.
            </label>
          </div>
          <button type="submit" class="mswd-button mswd-button-primary" :disabled="!feedbackForm.termsAccepted">
            Submit Feedback
          </button>
        </form>
        <button class="mswd-modal-close" @click="closeFeedback">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const services = ref([
  {
    icon: 'mswd-icon-heart',
    title: 'Support',
    description: 'Providing essential assistance to those in need'
  },
  {
    icon: 'mswd-icon-users',
    title: 'Community',
    description: 'Building stronger, more resilient communities'
  },
  {
    icon: 'mswd-icon-shield',
    title: 'Protection',
    description: 'Ensuring safety and well-being for all'
  }
]);
const showFeedbackModal = ref(false);
const feedbackForm = reactive({
  category: '',
  message: '',
  termsAccepted: false
});

const openFeedback = () => {
  showFeedbackModal.value = true;
};

const closeFeedback = () => {
  showFeedbackModal.value = false;
  resetFeedbackForm();
};

const resetFeedbackForm = () => {
  feedbackForm.category = '';
  feedbackForm.message = '';
  feedbackForm.termsAccepted = false;
};

const submitFeedback = () => {
  if (!feedbackForm.termsAccepted) {
    alert('Please agree to the terms before submitting.');
    return;
  }

  // Here you would typically send the feedback to a server
  // Ensure to only send non-personal information
  const feedbackData = {
    category: feedbackForm.category,
    message: feedbackForm.message,
    timestamp: new Date().toISOString()
  };

  console.log('Feedback submitted:', feedbackData);
  // In a real application, you would send this data to your server
  // using a secure method, ensuring no personal data is transmitted

  alert('Thank you for your feedback!');
  closeFeedback();
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #2ecc71;
  --primary-dark: #27ae60;
  --primary-light: #a9dfbf;
  --accent-color: #3498db;
  --text-color: #333333;
  --text-light: #777777;
  --background-color: #f0f8f1;
  --card-background: #ffffff;
}

.mswd-container {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background-color) 0%, #e8f6e8 100%);
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.mswd-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.mswd-card {
  background-color: var(--card-background);
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.mswd-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.mswd-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

.mswd-subtitle {
  font-size: 1.2rem;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
}

.mswd-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mswd-button {
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.mswd-button-primary {
  background-color: var(--primary-color);
  color: rgb(0, 0, 0);
}

.mswd-button-secondary {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.mswd-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3);
}

.mswd-button-primary:hover {
  background-color: var(--primary-dark);
}

.mswd-button-secondary:hover {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.mswd-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.mswd-divider {
  height: 2px;
  background: linear-gradient(to right, var(--primary-light), var(--primary-color), var(--primary-light));
  margin: 2rem 0;
  border-radius: 2px;
}

.mswd-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.mswd-service {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--primary-light);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.mswd-service:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(46, 204, 113, 0.2);
}

.mswd-service-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.mswd-icon-heart::before { content: '♥'; }
.mswd-icon-users::before { content: '👥'; }
.mswd-icon-shield::before { content: '🛡'; }

.mswd-service-title {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.mswd-service-description {
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 400;
}

.mswd-image {
  flex: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.mswd-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.8) 0%, rgba(39, 174, 96, 0.8) 100%);
}

.mswd-image-overlay {
  position: relative;
  padding: 3rem;
  text-align: center;
  color: white;
  max-width: 80%;
}

.mswd-image-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.mswd-image-description {
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 300;
}

.mswd-feedback-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mswd-feedback-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.mswd-feedback-icon {
  margin-right: 0.5rem;
  font-size: 1.4rem;
}

/* Modal Styles */
.mswd-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.mswd-modal {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.mswd-modal-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.mswd-feedback-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mswd-form-group {
  display: flex;
  flex-direction: column;
}

.mswd-form-group label {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.mswd-form-group select,
.mswd-form-group textarea {
  padding: 0.5rem;
  border: 1px solid var(--primary-light);
  border-radius: 5px;
  font-size: 1rem;
}

.mswd-form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.mswd-modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
}

@media (max-width: 960px) {
  .mswd-container {
    flex-direction: column;
  }

  .mswd-image {
    min-height: 50vh;
  }
}

@media (max-width: 600px) {
  .mswd-card {
    padding: 2rem;
  }

  .mswd-buttons {
    flex-direction: column;
  }

  .mswd-services {
    grid-template-columns: 1fr;
  }

  .mswd-feedback-button {
    bottom: 10px;
    right: 10px;
    font-size: 1rem;
    padding: 10px 20px;
  }

  .mswd-modal {
    width: 95%;
    padding: 1.5rem;
  }
}
</style>