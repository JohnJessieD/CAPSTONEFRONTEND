<template>
  <div class="page-wrapper">
    <!-- Header Section -->
    <header class="header">
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="navbar-brand">
          <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
          <span class="brand-text">Welcome to Municipal SWD!</span>
        </div>
        <div class="navbar-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/" class="nav-link">Meet Our Departments</router-link>
          <router-link to="/" class="nav-link">Upcoming Events</router-link>
          <router-link to="/" class="nav-link">Services</router-link>
          <router-link to="/" class="nav-link">Publications</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Municipal Social Welfare and Development</h1>
        <p>Empowering communities for a better tomorrow</p>
        <button class="cta-button">Learn More</button>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <h2>Our Services</h2>
        <div class="service-list">
          <div class="service">
            <div class="service-icon">📦</div>
            <h3>Family Assistance Program</h3>
            <p>Providing support to families in need through various assistance programs.</p>
          </div>
          <div class="service">
            <div class="service-icon">👶</div>
            <h3>Child Welfare Program</h3>
            <p>Ensuring the protection and welfare of children in the community.</p>
          </div>
          <div class="service">
            <div class="service-icon">👵</div>
            <h3>Elderly Assistance Program</h3>
            <p>Supporting the elderly population with healthcare, social services, and more.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact">
      <div class="container">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to get in touch with us.</p>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Poblacion, San Teodoro Oriental Mindoro</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone-alt"></i>
            <span>09178906047</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>mswdosanteodorooffice@gmail.com</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <h2>We Value Your Feedback</h2>
        <p>Please let us know your thoughts or any concerns.</p>
        <form @submit.prevent="submitFeedback" class="feedback-form">
          <div class="form-group">
            <label for="feedback">Your Feedback:</label>
            <textarea id="feedback" v-model="feedback" placeholder="Enter your feedback here" required></textarea>
          </div>
          <button type="submit" class="submit-button">Submit Feedback</button>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      feedback: ''
    };
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    submitFeedback() {
      if (this.feedback.trim()) {
        alert(`Thank you for your feedback: "${this.feedback}"`);
        this.feedback = '';
      } else {
        alert('Please enter your feedback before submitting.');
      }
    }
  }
}
</script>

<style scoped>
/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Header Styles */
.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 50px;
  margin-right: 1rem;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.1);
}

.brand-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background-color: #3498db;
  color: #fff;
}

/* Hero Section */
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('C:/laragon/www/CAPSTONEFRONTEND/mswd/public/img/DSC01382-1080x675.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 150px 20px;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInDown 1s ease-out;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.cta-button {
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: fadeInUp 1s ease-out 1s both;
}

.cta-button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

/* Services Section */
.services {
  background-color: #fff;
  padding: 80px 0;
}

.service-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
}

.service {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.service p {
  font-size: 1rem;
  color: #666;
}

/* Contact Section */
.contact {
  background-color: #f8f9fa;
  padding: 80px 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-item i {
  color: #3498db;
  font-size: 1.5rem;
}

/* Footer Section */
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 60px 0;
  margin-top: auto;
}

.feedback-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
  height: 120px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
}

.submit-button {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>