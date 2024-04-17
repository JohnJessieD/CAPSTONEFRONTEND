<template>
    <div>
      <!-- Header Section -->
      <header>
        <!-- Navigation Bar -->
        <nav class="navbar"> <div class="navbar-brand">
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
        </div>
      </section>
  
      <!-- Services Section -->
      <section class="services">
        <div class="container">
          <h2>Our Services</h2>
          <div class="service">
            <h3>1. Family Assistance Program</h3>
            <p>Providing support to families in need through various assistance programs.</p>
          </div>
          <div class="service">
            <h3>2. Child Welfare Program</h3>
            <p>Ensuring the protection and welfare of children in the community.</p>
          </div>
          <div class="service">
            <h3>3. Elderly Assistance Program</h3>
            <p>Supporting the elderly population with healthcare, social services, and more.</p>
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
              <span>123 Main Street, City, Country</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone-alt"></i>
              <span>+123456789</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>info@municipality.gov</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  

  <script>
  export default {
    name: 'LandingPage',
    methods: {
      login() {
        // Redirect to the login page
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  header {
  background-color: #4CAF50;
  color: #fff;
  padding: 1rem 0;
}.navbar {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem; /* Adjusted padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 1024px;
  margin: 0 auto; /* Center the navbar horizontally */
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
}

.logo-img {
  width: 50px;
  margin-right: 0.5rem; /* Adjusted margin */
}

.brand-text {
  font-family: 'Poppins', sans-serif;
}

.navbar-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1rem; /* Adjusted padding */
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.logout-button {
  background-color: #fff;
  color: #333;
  border: none;
  padding: 0.8rem 1rem; /* Adjusted padding */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #e0e0e0;
} 


  
  /* Hero Section */
  .hero {
    background-image: url('C:\laragon\www\CAPSTONEFRONTEND\mswd\public\img\DSC01382-1080x675.jpg'); /* Replace with actual image */
    background-size: cover;
    background-position: center;
    color: #fff;
    text-align: center;
    padding: 100px 0;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  .hero p {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
  
  .hero button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }
  
  .hero button:hover {
    background-color: #45a049;
  }
  
  /* Services Section */
  .services {
    background-color: #f9f9f9;
    padding: 80px 0;
  }
  
  .services h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
  }
  
  .service {
    margin-bottom: 40px;
  }
  
  .service h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .service p {
    font-size: 1.1rem;
  }
  
  /* Contact Section */
  .contact {
    padding: 80px 0;
    text-align: center;
  }
  
  .contact h2 {
    margin-bottom: 40px;
    font-size: 2.5rem;
  }
  
  .contact p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .contact-info {
    display: flex;
    justify-content: center;
  }
  
  .contact-item {
    margin: 0 20px;
  }
  
  .contact-item i {
    margin-right: 10px;
    color: #4CAF50;
    font-size: 1.5rem;
  }
  
  .contact-item span {
    font-size: 1.2rem;
  }
  </style>
  