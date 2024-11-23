<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="/placeholder.svg?height=50&width=50" class="logo-img" alt="Solo Parent Logo" />
          <span class="brand-text">Solo Parent Support</span>
        </div>
        <div class="navbar-links">
          <div v-for="(item, index) in navItems" :key="index" class="dropdown">
            <button class="dropbtn">{{ item.title }} <ChevronDownIcon size="16" /></button>
            <div class="dropdown-content">
              <a v-for="link in item.links" :key="link.to" :href="link.to">{{ link.text }}</a>
            </div>
          </div>
          <button class="logout-button" @click="logout">Sign Out</button>
        </div>
      </div>
    </nav>

    <div class="page-container">
      <h1 class="page-title">Workshops for Solo Parents</h1>
      <div class="workshop-grid">
        <div v-for="workshop in workshops" :key="workshop.id" class="workshop-card">
          <div class="workshop-icon">
            <component :is="workshop.icon" size="48" />
          </div>
          <h2>{{ workshop.title }}</h2>
          <p>{{ workshop.description }}</p>
          <div class="workshop-details">
            <CalendarIcon size="16" />
            <span>{{ workshop.date }}</span>
          </div>
          <div class="workshop-details">
            <ClockIcon size="16" />
            <span>{{ workshop.time }}</span>
          </div>
          <div class="workshop-details">
            <MapPinIcon size="16" />
            <span>{{ workshop.location }}</span>
          </div>
          <a :href="workshop.link" class="btn-register">Register Now</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon, CalendarIcon, ClockIcon, MapPinIcon, BookOpenIcon, HeartHandshakeIcon, BrainIcon, PiggyBankIcon } from 'lucide-vue-next'

const navItems = ref([
  {
    title: 'Assistance',
    links: [
      { to: '/financialaid', text: 'Financial Aid' },
      { to: '/legalsupport', text: 'Legal Support' },
      { to: '/housingassistance', text: 'Housing Assistance' }
    ]
  },
  {
    title: 'Events',
    links: [
      { to: '/workshops', text: 'Workshops' },
      { to: '/supportgroups', text: 'Support Groups' },
      { to: '/communityevents', text: 'Community Events' }
    ]
  },
  {
    title: 'Services',
    links: [
      { to: '/counseling', text: 'Counseling' },
      { to: '/childcare', text: 'Childcare' },
      { to: '/jobtraining', text: 'Job Training' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { to: '/education', text: 'Education' },
      { to: '/healthandwellness', text: 'Health & Wellness' },
      { to: '/parentingtips', text: 'Parenting Tips' }
    ]
  }
])

const logout = () => {
  // Implement logout logic here
  console.log('Logging out...')
}

const workshops = ref([
  {
    id: 1,
    title: 'Effective Co-Parenting Strategies',
    description: 'Learn techniques for successful co-parenting and conflict resolution.',
    date: 'July 15, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Community Center',
    icon: HeartHandshakeIcon,
    link: '#'
  },
  {
    id: 2,
    title: 'Financial Planning for Solo Parents',
    description: 'Gain insights on budgeting, saving, and planning for your family\'s future.',
    date: 'July 22, 2023',
    time: '10:00 AM - 12:00 PM',
    location: 'Online Webinar',
    icon: PiggyBankIcon,
    link: '#'
  },
  {
    id: 3,
    title: 'Stress Management and Self-Care',
    description: 'Discover techniques to manage stress and prioritize self-care.',
    date: 'August 5, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'Wellness Center',
    icon: BrainIcon,
    link: '#'
  },
  {
    id: 4,
    title: 'Navigating the Education System',
    description: 'Learn how to advocate for your child\'s educational needs.',
    date: 'August 12, 2023',
    time: '1:00 PM - 3:00 PM',
    location: 'Local Library',
    icon: BookOpenIcon,
    link: '#'
  }
])
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 2rem;
  text-align: center;
}

.workshop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.workshop-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.workshop-card:hover {
  transform: translateY(-5px);
}

.workshop-icon {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.workshop-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #666;
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

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>