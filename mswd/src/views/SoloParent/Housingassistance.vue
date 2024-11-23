<template>
  <div>
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
              <router-link v-for="link in item.links" :key="link.to" :to="link.to">{{ link.text }}</router-link>
            </div>
          </div>
          <button class="logout-button" @click="logout">Sign Out</button>
        </div>
      </div>
    </nav>

    <div class="page-container">
      <h1 class="page-title">Housing Assistance for Solo Parents</h1>
      <div class="content-grid">
        <div class="info-card">
          <HomeIcon size="48" class="card-icon" />
          <h2>Rental Assistance</h2>
          <p>Help with rent payments and finding affordable housing options.</p>
          <a href="#" class="btn-apply">Apply Now</a>
        </div>
        <div class="info-card">
          <ToolIcon size="48" class="card-icon" />
          <h2>Home Repair Grants</h2>
          <p>Financial assistance for essential home repairs and improvements.</p>
          <a href="#" class="btn-apply">Check Eligibility</a>
        </div>
        <div class="info-card">
          <KeyIcon size="48" class="card-icon" />
          <h2>First-Time Homebuyer Program</h2>
          <p>Support and resources for solo parents looking to purchase their first home.</p>
          <a href="#" class="btn-apply">Learn More</a>
        </div>
      </div>
      <section class="housing-resources">
        <h2>Additional Housing Resources</h2>
        <ul>
          <li>
            <MapPinIcon size="24" class="list-icon" />
            <span>Emergency Shelter Locations</span>
          </li>
          <li>
            <BookIcon size="24" class="list-icon" />
            <span>Tenant Rights Education</span>
          </li>
          <li>
            <UsersIcon size="24" class="list-icon" />
            <span>Housing Counseling Services</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, ToolIcon, KeyIcon, MapPinIcon, BookIcon, UsersIcon, ChevronDownIcon } from 'lucide-vue-next'

const navItems = ref([
  {
    title: 'Assistance',
    links: [
      { to: '/financial-aid', text: 'Financial Aid' },
      { to: '/legalsupport', text: 'Legal Support' },
      { to: '/housingassistance', text: 'Housing Assistance' }
    ]
  },
  {
    title: 'Events',
    links: [
      { to: '/WorkshopsComponent', text: 'Workshops' },
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
</script>

<style scoped>
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.btn-apply {
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-apply:hover {
  background-color: #1b5e20;
}

.housing-resources {
  background-color: #f0f8f0;
  border-radius: 8px;
  padding: 2rem;
}

.housing-resources h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.housing-resources ul {
  list-style-type: none;
  padding: 0;
}

.housing-resources li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.list-icon {
  color: #2e7d32;
  margin-right: 1rem;
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

  .page-title {
    font-size: 2rem;
  }
}
</style>