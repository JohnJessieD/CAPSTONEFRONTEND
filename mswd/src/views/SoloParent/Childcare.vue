<template>
    <div>
      <! Navigation Bar >
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
  
      <!-- Main Content -->
      <div class="page-container">
        <h1 class="page-title">Childcare Services for Solo Parents</h1>
        <div class="service-grid">
          <div v-for="service in childcareServices" :key="service.id" class="service-card">
            <div class="service-icon">
              <component :is="service.icon" size="48" />
            </div>
            <h2>{{ service.title }}</h2>
            <p>{{ service.description }}</p>
            <a :href="service.link" class="btn-learn-more">Learn More</a>
          </div>
        </div>
        <section class="childcare-finder">
          <h2>Find Childcare Near You</h2>
          <div class="finder-form">
            <input type="text" placeholder="Enter your zip code" class="zip-input" />
            <button class="btn-search">Search</button>
          </div>
        </section>
        <section class="childcare-resources">
          <h2>Additional Childcare Resources</h2>
          <ul class="resource-list">
            <li>
              <FileTextIcon size="24" />
              <a href="#">Childcare Subsidy Application Guide</a>
            </li>
            <li>
              <CheckSquareIcon size="24" />
              <a href="#">Childcare Provider Vetting Checklist</a>
            </li>
            <li>
              <BookOpenIcon size="24" />
              <a href="#">After-School Programs Directory</a>
            </li>
            <li>
              <HelpCircleIcon size="24" />
              <a href="#">Frequently Asked Questions</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    ChevronDownIcon,
    BabyIcon,
    UsersIcon,
    ClockIcon,
    HomeIcon,
    FileTextIcon,
    CheckSquareIcon,
    BookOpenIcon,
    HelpCircleIcon,
  } from 'lucide-vue-next'
  
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
        { to: '/communityevents', text: 'Community Events' },
      ],
    },
    {
      title: 'Services',
      links: [
        { to: '/counseling', text: 'Counseling' },
        { to: '/childcare', text: 'Childcare' },
        { to: '/jobtraining', text: 'Job Training' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/education', text: 'Education' },
        { to: '/healthandwellness', text: 'Health & Wellness' },
        { to: '/parentingtips', text: 'Parenting Tips' },
      ],
    },
  ])
  
  const childcareServices = ref([
    {
      id: 1,
      title: 'Daycare Centers',
      description: 'Licensed facilities offering full-day care for children of various ages.',
      icon: BabyIcon,
      link: '#',
    },
    {
      id: 2,
      title: 'In-Home Childcare',
      description: 'Experienced caregivers providing personalized care in your home.',
      icon: HomeIcon,
      link: '#',
    },
    {
      id: 3,
      title: 'After-School Programs',
      description: 'Supervised activities and care for school-age children after regular school hours.',
      icon: ClockIcon,
      link: '#',
    },
    {
      id: 4,
      title: 'Emergency Childcare',
      description: 'Short-notice care options for unexpected situations or emergencies.',
      icon: UsersIcon,
      link: '#',
    },
  ])
  
  const logout = () => {
    console.log('Logging out...')
  }
  </script>
  
  <style scoped>
  /* Navigation Bar */
  .navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
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
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  
  /* Page Container */
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
  
  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .service-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
  }
  
  .service-icon {
    color: #2e7d32;
    margin-bottom: 1rem;
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
  
  .childcare-finder {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .childcare-finder h2 {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .finder-form {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .zip-input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  
  .btn-search {
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-search:hover {
    background-color: #1b5e20;
  }
  
  .childcare-resources h2 {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .resource-list {
    list-style: none;
    padding: 0;
  }
  
  .resource-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  </style>
  