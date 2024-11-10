<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/Pwd" class="nav-link">Assistance</router-link>
        <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
        <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
        <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
        <button class="logout-button" @click="logout">Sign Out</button>
      </div>
    </nav>

    <div class="homepage">
      <header class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to MSWD Office</h1>
          <p class="hero-subtitle">Empowering Communities, Uplifting Lives</p>
          <a href="#services" class="cta-button">Explore Our Services</a>
        </div>
      </header>

      <main class="main-content">
        <section id="services" class="services" aria-labelledby="services-heading">
          <h2 id="services-heading" class="section-title">Our Services</h2>
          <div class="service-list">
            <div v-for="(service, index) in services" :key="index" class="service-item">
              <div class="service-icon" :style="{ backgroundColor: service.color }">
                <span class="icon-placeholder">{{ service.icon }}</span>
              </div>
              <div class="service-content">
                <h3 class="service-title">{{ service.title }}</h3>
                <p class="service-description">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="core-values" aria-labelledby="core-values-heading">
          <h2 id="core-values-heading" class="section-title">Our Core Values</h2>
          <div class="values-grid">
            <div v-for="(value, index) in coreValues" :key="index" class="value-card">
              <div class="value-icon">
                <span class="icon-placeholder">{{ value.icon }}</span>
              </div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-description">{{ value.description }}</p>
            </div>
          </div>
        </section>

        <section class="objectives" aria-labelledby="objectives-heading">
          <h2 id="objectives-heading" class="section-title">Our Objectives</h2>
          <div class="objectives-list">
            <div v-for="(objective, index) in objectives" :key="index" class="objective-item">
              <div class="objective-number">{{ index + 1 }}</div>
              <p class="objective-text">{{ objective }}</p>
            </div>
          </div>
        </section>

        <section class="featured-programs" aria-labelledby="programs-heading">
          <h2 id="programs-heading" class="section-title">Featured Programs</h2>
          <div class="programs-grid">
            <div v-for="(program, index) in featuredPrograms" :key="index" class="program-card">
              <img :src="program.image" :alt="program.title" class="program-image">
              <div class="program-content">
                <h3 class="program-title">{{ program.title }}</h3>
                <p class="program-description">{{ program.description }}</p>
                <a :href="program.link" class="program-link">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        <section class="news-updates" aria-labelledby="news-heading">
          <h2 id="news-heading" class="section-title">Latest News</h2>
          <div class="news-grid">
            <article v-for="(news, index) in newsUpdates" :key="index" class="news-card">
              <img :src="news.image" :alt="news.title" class="news-image">
              <div class="news-content">
                <h3 class="news-title">{{ news.title }}</h3>
                <p class="news-date">{{ formatDate(news.date) }}</p>
                <p class="news-excerpt">{{ news.excerpt }}</p>
                <a :href="news.link" class="read-more-link">Read More</a>
              </div>
            </article>
          </div>
        </section>

        <section class="contact-section" aria-labelledby="contact-heading">
          <h2 id="contact-heading" class="section-title">Contact Us</h2>
          <div class="contact-container">
            <div class="contact-info">
              <h3 class="contact-subtitle">Get in Touch</h3>
              <p class="contact-text">If you have any questions or need assistance, feel free to reach out to us:</p>
              <ul class="contact-list">
                <li>
                  <span class="icon-placeholder">✉️</span>
                  <a href="mailto:mswd-office@example.com">mswd-office@example.com</a>
                </li>
                <li>
                  <span class="icon-placeholder">📞</span>
                  <a href="tel:+63123456789">+63 123 456 789</a>
                </li>
                <li>
                  <span class="icon-placeholder">📍</span>
                  <span>MSWD Office, San Teodoro, Oriental Mindoro, Philippines</span>
                </li>
              </ul>
            </div>
            <form class="contact-form" @submit.prevent="submitContactForm">
              <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" v-model="contactForm.name" placeholder="Your Name" required class="form-input">
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="contactForm.email" placeholder="Your Email" required class="form-input">
              </div>
              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" v-model="contactForm.message" rows="4" placeholder="Your Message" required class="form-input"></textarea>
              </div>
              <button type="submit" class="submit-button">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">About MSWD</h3>
            <p class="footer-text">The Municipal Social Welfare and Development office is dedicated to improving the lives of our community members through various social programs and initiatives.</p>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#programs-heading">Programs</a></li>
              <li><a href="#news-heading">News</a></li>
              <li><a href="#contact-heading">Contact</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Connect With Us</h3>
            <div class="social-icons">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-text">&copy; {{ currentYear }} Municipal SWD. All rights reserved.</p>

        </div>
      </footer>
    </div>
</template>

<script>
export default {
  name: 'IntegratedMSWDHomepage',
  data() {
    return {
      isDarkMode: false,
      contactForm: {
        name: '',
        email: '',
        message: ''
      },
      services: [
        { title: 'Persons with Disabilities (PWDs)', description: 'Support and services for individuals with disabilities', icon: '👥', color: '#4CAF50' },
        { title: 'Solo Parents', description: 'Assistance programs for single parents', icon: '❤️', color: '#2196F3' },
        { title: 'Senior Citizens', description: 'Care and support for our elderly community members', icon: '👴', color: '#FFC107' },
        { title: 'Daycare Services', description: 'Early childhood care and development programs', icon: '📚', color: '#9C27B0' },
      ],
      coreValues: [
        { title: 'Service Excellence', description: 'Committed to providing the highest quality of service', icon: '🌟' },
        { title: 'Community Empowerment', description: 'Enabling individuals and communities to thrive', icon: '💪' },
        { title: 'Transparency', description: 'Open and honest in all our operations', icon: '🔍' },
        { title: 'Social Justice', description: 'Promoting fairness and equality for all', icon: '⚖️' },
      ],
      objectives: [
        'Provide accessible social welfare services to all community members',
        'Promote the well-being and empowerment of marginalized sectors',
        'Implement government programs for social development effectively',
        'Foster partnerships for sustainable community development',
      ],
      featuredPrograms: [
        { title: 'Livelihood Assistance', description: 'Supporting individuals in starting small businesses', image: '/placeholder.svg?height=200&width=300', link: '#' },
        { title: 'Healthcare Subsidies', description: 'Providing financial assistance for medical needs', image: '/placeholder.svg?height=200&width=300', link: '#' },
        { title: 'Education Support', description: 'Scholarships and educational assistance for students', image: '/placeholder.svg?height=200&width=300', link: '#' },
      ],
      newsUpdates: [
        { title: 'New Community Center Opens', date: '2024-05-15', excerpt: 'A state-of-the-art community center has been inaugurated...', image: '/placeholder.svg?height=200&width=300', link: '#' },
        { title: 'Successful Health Camp', date: '2024-05-10', excerpt: 'Over 500 residents benefited from our recent health camp...', image: '/placeholder.svg?height=200&width=300', link: '#' },
        { title: 'Youth Skills Program Launch', date: '2024-05-05', excerpt: 'A new program aimed at developing skills among the youth...', image: '/placeholder.svg?height=200&width=300', link: '#' },
      ],
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    submitContactForm() {
      console.log('Form submitted:', this.contactForm)
      // Reset form after submission
      this.contactForm = { name: '', email: '', message: '' }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    logout() {
      // Implement logout logic here
      console.log('Logging out...')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff5252;
}

.homepage {
  padding-top: 80px;
}

.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/DSC01382-1080x675.jpg');

  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-align: center;
  padding: 6rem 2rem;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom:  2rem;
}

.cta-button {
  display: inline-block;
  background-color: #1a73e8;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.cta-button:hover, .cta-button:focus {
  background-color: #1557b0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  font-size: 2rem;
  color: #1a73e8;
  margin-bottom: 2rem;
  text-align: center;
}

.services {
  padding: 4rem 0;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.service-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  font-size: 32px;
}

.service-content {
  flex: 1;
  padding: 1.5rem;
}

.service-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: 0.9rem;
  color: #666;
}

.values-grid, .programs-grid, .news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card, .program-card, .news-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover, .program-card:hover, .news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 1.5rem auto;
  font-size: 24px;
}

.value-title, .program-title, .news-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.value-description, .program-description, .news-excerpt {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  padding: 0 1.5rem 1.5rem;
}

.objectives-list {
  display: grid;
  gap: 1rem;
}

.objective-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.objective-number {
  background-color: #1a73e8;
  color: #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.objective-text {
  flex: 1;
}

.program-image, .news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.program-content, .news-content {
  padding: 1.5rem;
}

.program-link, .read-more-link {
  display: inline-block;
  margin-top: 1rem;
  color: #1a73e8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.program-link:hover, .read-more-link:hover,
.program-link:focus, .read-more-link:focus {
  color: #1557b0;
}

.news-date {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.contact-info, .contact-form {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a73e8;
}

.contact-text {
  margin-bottom: 1.5rem;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.icon-placeholder {
  margin-right: 0.5rem;
  font-size: 20px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
}

.submit-button:hover, .submit-button:focus {
  background-color: #1557b0;
}

.footer {
  background-color: #333;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.footer-text {
  font-size: 0.9rem;
  opacity: 0.8;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover, .footer-links a:focus {
  color: #1a73e8;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.social-icons a:hover, .social-icons a:focus {
  color: #1a73e8;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 20px;
}

.theme-toggle:hover, .theme-toggle:focus {
  color: #1a73e8;
}

/* Dark mode styles */
.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-mode .navbar,
.dark-mode .service-item,
.dark-mode .value-card,
.dark-mode .program-card,
.dark-mode .news-card,
.dark-mode .objective-item,
.dark-mode .contact-info,
.dark-mode .contact-form {
  background-color: #2a2a2a;
  color: #ffffff;
}

.dark-mode .nav-link {
  color: #ffffff;
}

.dark-mode .nav-link:hover,
.dark-mode .nav-link:focus {
  background-color: #3a3a3a;
}

.dark-mode .section-title,
.dark-mode .contact-subtitle {
  color: #64b5f6;
}

.dark-mode .service-description,
.dark-mode .value-description,
.dark-mode .program-description,
.dark-mode .news-excerpt,
.dark-mode .news-date {
  color: #b0b0b0;
}

.dark-mode .footer {
  background-color: #2a2a2a;
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

  .hero-title {
    font-size: 2.5rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
  }

  .service-item {
    flex-direction: column;
    text-align: center;
  }

  .service-icon {
    width: 100%;
    height: 100px;
  }

  .service-content {
    padding: 1.5rem;
  }
}
</style>