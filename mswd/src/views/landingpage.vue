<template>
  <div class="page-wrapper">
    <header class="header">
      <nav class="navbar">
        <div class="navbar-brand">
          <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
          <span class="brand-text">Welcome to Municipal SWD!</span>
        </div>
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="navbar-links" :class="{ 'active': isMenuOpen }">
          <a href="#home" class="nav-link">Home</a>
          <a href="#departments" class="nav-link">Meet Our Departments</a>
          <a href="#events" class="nav-link">Upcoming Events</a>
          <a href="#services" class="nav-link">Services</a>
          <a href="#publications" class="nav-link">Publications</a>
          <a href="#login" class="nav-link">Login</a>
        </div>
      </nav>
    </header>

    <section class="hero" id="home">
      <div class="hero-content">
        <h1>Welcome to Municipal Social Welfare and Development</h1>
        <p>Empowering communities for a better tomorrow</p>
        <button class="cta-button">Learn More</button>
      </div>
    </section>

    <section class="services" id="services">
      <h2>Our Services</h2>
      <div class="service-list">
        <div class="service" v-for="service in services" :key="service.title">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>

    <section class="contact" id="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or need assistance, feel free to get in touch with us.</p>
      <div class="contact-info">
        <div class="contact-item" v-for="item in contactInfo" :key="item.icon">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </div>
      </div>
    </section>

    <footer class="footer">
      <h2>We Value Your Feedback</h2>
      <p>Please let us know your thoughts or any concerns.</p>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <div class="form-group">
          <label for="feedback">Your Feedback:</label>
          <textarea id="feedback" v-model="feedback" placeholder="Enter your feedback here" required></textarea>
        </div>
        <button type="submit" class="submit-button">Submit Feedback</button>
      </form>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'MswdLandingPage',
  data() {
    return {
      isMenuOpen: false,
      feedback: '',
      services: [
        {
          icon: '📦',
          title: 'Family Assistance Program',
          description: 'Providing support to families in need through various assistance programs.'
        },
        {
          icon: '👶',
          title: 'Child Welfare Program',
          description: 'Ensuring the protection and welfare of children in the community.'
        },
        {
          icon: '👵',
          title: 'Elderly Assistance Program',
          description: 'Supporting the elderly population with healthcare, social services, and more.'
        }
      ],
      contactInfo: [
        {
          icon: 'fas fa-map-marker-alt',
          text: 'Poblacion, San Teodoro Oriental Mindoro'
        },
        {
          icon: 'fas fa-phone-alt',
          text: '09178906047'
        },
        {
          icon: 'fas fa-envelope',
          text: 'mswdosanteodorooffice@gmail.com'
        }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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
<style>
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem; /* Reduced padding */
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Adjusted gap */
}

.logo-img {
  width: 40px;
}

.brand-text {
  font-size: 1rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  margin-right: 2rem;
}

.navbar-links a {
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-links a:hover {
  color: #3498db;
}

/* Banner Area */
.banner {
  margin-top: 3rem; /* Adjust based on navbar height */
  padding: 2rem 0; /* Reduced padding */
  background-image: url('');
  background-size: cover;
  background-position: center;
  text-align: center;
  color: white;
}

.banner h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

/* Main Section */
section {
  padding: 3rem 1rem; /* Reduced padding */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem; /* Smaller padding on mobile */
  }

  .navbar-brand {
    gap: 0.5rem;
  }

  .logo-img {
    width: 35px;
  }

  .brand-text {
    font-size: 0.9rem;
  }

  .menu-toggle {
    display: flex; /* Show menu toggle on smaller screens */
  }

  .navbar-links {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: none;
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-links.active {
    display: flex;
  }

  .banner {
    margin-top: 2rem; /* Adjust banner top margin on mobile */
    padding: 1.5rem 0; /* Reduce banner padding on mobile */
  }
}


.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 30px;
  height: 3px;
  background: #2c3e50;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('C:\laragon\www\CAPSTONEFRONTEND\mswd\public\img\DSC01382-1080x675.jpg');
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
.services {
  background-color: #fff;
  padding: 80px 20px;
}

.service-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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

.contact {
  background-color: #f8f9fa;
  padding: 80px 20px;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin: 2rem auto 0;
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

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 60px 20px;
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

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
  }

  .menu-toggle {
    display: flex;
  }

  .navbar-links {
    flex-direction: column;
    width: 100%;
    display: none;
  }

  .navbar-links.active {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .service {
    min-width: 100%;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>