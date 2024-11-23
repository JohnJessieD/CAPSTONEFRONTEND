<template>
  <div class="solo-parent-home">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="/placeholder.svg?height=50&width=50" class="logo-img" alt="Solo Parent Logo" />
          <span class="brand-text">Solo Parent Support</span>
        </div>
        <div class="navbar-links">
          <div class="dropdown">
            <button class="dropbtn">Assistance <ChevronDownIcon size="16" /></button>
            <div class="dropdown-content">
              <router-link to="/financialaid">Financial Aid</router-link>
              <router-link to="/legalsupport">Legal Support</router-link>
              <router-link to="/housingassistance">Housing Assistance</router-link>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">Events <ChevronDownIcon size="16" /></button>
            <div class="dropdown-content">
              <router-link to="/workshopscomponent">Workshops</router-link>
              <router-link to="/supportgroups">Support Groups</router-link>
              <router-link to="/communityevents">Community Events</router-link>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">Services <ChevronDownIcon size="16" /></button>
            <div class="dropdown-content">
              <router-link to="/counseling">Counseling</router-link>
              <router-link to="/childcare">Childcare</router-link>
              <router-link to="/jobtraining">Job Training</router-link>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">Resources <ChevronDownIcon size="16" /></button>
            <div class="dropdown-content">
              <router-link to="/education">Education</router-link>
              <router-link to="/healthwellness">Health & Wellness</router-link>
              <router-link to="/parentingtips">Parenting Tips</router-link>
            </div>
          </div>
          <button class="logout-button" @click="logout">Sign Out</button>
        </div>
      </div>
    </nav>

    <header class="hero">
      <div class="container">
        <h1>Welcome, Solo Parents!</h1>
        <p>Empowering You, Supporting Your Journey</p>
      </div>
    </header>

    <main class="container">
      <section class="services">
        <h2>Our Services for Solo Parents</h2>
        <div class="service-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="service-icon">
              <component :is="service.icon" size="48" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </section>

      <section class="support-programs">
        <h2>Support Programs</h2>
        <div class="program-list">
          <div v-for="program in programs" :key="program.title" class="program-item">
            <h3>{{ program.title }}</h3>
            <p>{{ program.description }}</p>
            <router-link :to="program.link" class="btn-learn-more">Learn More</router-link>
          </div>
        </div>
      </section>

      <section class="upcoming-events">
        <h2>Upcoming Events</h2>
        <div class="event-list">
          <div v-for="event in events" :key="event.title" class="event-card">
            <div class="event-date">
              <span class="day">{{ event.day }}</span>
              <span class="month">{{ event.month }}</span>
            </div>
            <div class="event-details">
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
              <a href="#" class="btn-register">Register</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2023 Solo Parent Support. All rights reserved.</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><FacebookIcon /></a>
          <a href="#" aria-label="Twitter"><TwitterIcon /></a>
          <a href="#" aria-label="Instagram"><InstagramIcon /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HeartHandshakeIcon, BookOpenIcon, UsersIcon, GraduationCapIcon } from 'lucide-vue-next'
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-vue-next'
import { ChevronDownIcon } from 'lucide-vue-next'

const services = ref([
  { title: 'Financial Assistance', description: 'Support for solo parents facing financial challenges.', icon: HeartHandshakeIcon },
  { title: 'Legal Advice', description: 'Free legal consultations on family law matters.', icon: BookOpenIcon },
  { title: 'Support Groups', description: 'Connect with other solo parents in your community.', icon: UsersIcon },
  { title: 'Education Support', description: 'Resources to help with your children\'s education.', icon: GraduationCapIcon },
])

const programs = ref([
  { title: 'Solo Parent ID', description: 'Get your official Solo Parent ID for various benefits.', link: '/solo-parent-id' },
  { title: 'Skills Training', description: 'Free vocational and skills development courses.', link: '/skills-training' },
  { title: 'Counseling Services', description: 'Professional counseling for you and your children.', link: '/counseling' },
])

const events = ref([
  { day: '15', month: 'Jul', title: 'Solo Parents\' Day Celebration', description: 'Join us for a day of fun and community building.' },
  { day: '22', month: 'Jul', title: 'Parenting Workshop', description: 'Learn effective strategies for single parenting.' },
  { day: '05', month: 'Aug', title: 'Career Fair for Solo Parents', description: 'Explore job opportunities tailored for solo parents.' },
])

const logout = () => {
  // Implement logout logic here
  console.log('Logging out...')
}
</script>

<style scoped>
.solo-parent-home {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f8f0;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e7d32;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: #2e7d32;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logout-button {
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #1b5e20;
}

@media (max-width: 1024px) {
  .navbar .container {
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-links {
    flex-direction: column;
    align-items: stretch;
  }

  .dropdown {
    width: 100%;
  }

  .dropbtn {
    width: 100%;
    justify-content: space-between;
  }

  .dropdown-content {
    position: static;
    display: none;
    width: 100%;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .logout-button {
    width: 100%;
    margin-top: 1rem;
  }
}

.hero {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 4rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

main {
  padding: 4rem 0;
}

section {
  margin-bottom: 4rem;
}

h2 {
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 2rem;
  text-align: center;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.program-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.program-item {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn-learn-more {
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-learn-more:hover {
  background-color: #1b5e20;
}

.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.event-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
}

.event-date {
  background-color: #2e7d32;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.event-date .day {
  font-size: 1.5rem;
  font-weight: 700;
}

.event-details {
  padding: 1rem;
  flex-grow: 1;
}

.btn-register {
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-register:hover {
  background-color: #1b5e20;
}

footer {
  background-color: #2e7d32;
  color: white;
  padding: 2rem 0;
}

footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: white;
  transition: opacity 0.3s ease;
}

.social-links a:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  footer .container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>