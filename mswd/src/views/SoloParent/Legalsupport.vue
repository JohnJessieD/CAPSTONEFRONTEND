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
      <h1 class="page-title">Legal Support for Solo Parents</h1>
      <div class="content-grid">
        <div class="info-card">
          <ScalesIcon size="48" class="card-icon" />
          <h2>Child Custody</h2>
          <p>Legal advice and representation for child custody and visitation matters.</p>
          <a href="#" class="btn-consult">Get Consultation</a>
        </div>
        <div class="info-card">
          <FileTextIcon size="48" class="card-icon" />
          <h2>Child Support</h2>
          <p>Assistance with filing for child support or modifying existing agreements.</p>
          <a href="#" class="btn-consult">Learn More</a>
        </div>
        <div class="info-card">
          <ShieldIcon size="48" class="card-icon" />
          <h2>Domestic Violence</h2>
          <p>Legal protection and support for victims of domestic violence.</p>
          <a href="#" class="btn-consult">Seek Help</a>
        </div>
      </div>
      <section class="free-resources">
        <h2>Free Legal Resources</h2>
        <ul>
          <li>
            <BookOpenIcon size="24" class="list-icon" />
            <span>Legal Rights Guide for Solo Parents</span>
          </li>
          <li>
            <CalendarIcon size="24" class="list-icon" />
            <span>Monthly Legal Clinics (Every 1st Saturday)</span>
          </li>
          <li>
            <PhoneIcon size="24" class="list-icon" />
            <span>24/7 Legal Helpline: 1-800-SOLO-HELP</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ScalesIcon, FileTextIcon, ShieldIcon, BookOpenIcon, CalendarIcon, PhoneIcon, ChevronDownIcon } from 'lucide-vue-next'

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

.btn-consult {
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-consult:hover {
  background-color: #1b5e20;
}

.free-resources {
  background-color: #f0f8f0;
  border-radius: 8px;
  padding: 2rem;
}

.free-resources h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.free-resources ul {
  list-style-type: none;
  padding: 0;
}

.free-resources li {
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