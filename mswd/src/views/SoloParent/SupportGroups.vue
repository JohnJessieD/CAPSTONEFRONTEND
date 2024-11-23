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
        <h1 class="page-title">Support Groups for Solo Parents</h1>
        <div class="support-group-grid">
          <div v-for="group in supportGroups" :key="group.id" class="support-group-card">
            <div class="group-icon">
              <component :is="group.icon" size="48" />
            </div>
            <h2>{{ group.name }}</h2>
            <p>{{ group.description }}</p>
            <div class="group-details">
              <CalendarIcon size="16" />
              <span>{{ group.schedule }}</span>
            </div>
            <div class="group-details">
              <MapPinIcon size="16" />
              <span>{{ group.location }}</span>
            </div>
            <a :href="group.link" class="btn-join">Join Group</a>
          </div>
        </div>
        <section class="testimonials">
          <h2>What Our Members Say</h2>
          <div class="testimonial-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
              <p>"{{ testimonial.quote }}"</p>
              <div class="testimonial-author">- {{ testimonial.author }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronDownIcon, CalendarIcon, MapPinIcon, UsersIcon, HeartIcon, BabyIcon, GraduationCapIcon } from 'lucide-vue-next'
  
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
  
  const supportGroups = ref([
    {
      id: 1,
      name: 'Single Moms Unite',
      description: 'A supportive community for single mothers to share experiences and advice.',
      schedule: 'Every Tuesday, 7:00 PM',
      location: 'Community Center',
      icon: HeartIcon,
      link: '#'
    },
    {
      id: 2,
      name: 'Solo Dads Network',
      description: 'Connecting single fathers for mutual support and friendship.',
      schedule: 'Every Thursday, 6:30 PM',
      location: 'Local Park (Weather Permitting)',
      icon: UsersIcon,
      link: '#'
    },
    {
      id: 3,
      name: 'Parents of Toddlers',
      description: 'Support group for solo parents navigating the challenges of raising toddlers.',
      schedule: 'Every Saturday, 10:00 AM',
      location: 'Children\'s Library',
      icon: BabyIcon,
      link: '#'
    },
    {
      id: 4,
      name: 'Career-Focused Parents',
      description: 'For solo parents balancing career ambitions with family responsibilities.',
      schedule: 'Every Other Wednesday, 8:00 PM',
      location: 'Online Meeting',
      icon: GraduationCapIcon,
      link: '#'
    }
  ])
  
  const testimonials = ref([
    {
      id: 1,
      quote: "This group has been a lifeline for me. It's so comforting to know I'm not alone in this journey.",
      author: "Sarah M."
    },
    {
      id: 2,
      quote: "The support and advice I've received here have made me a better parent and a stronger person.",
      author: "Michael T."
    },
    {
      id: 3,
      quote: "I've made lifelong friends through this group. We're like a big, supportive family now.",
      author: "Lisa K."
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
  
  .support-group-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .support-group-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .support-group-card:hover {
    transform: translateY(-5px);
  }
  
  .group-icon {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .group-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #666;
  }
  
  .btn-join {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-join:hover {
    background-color: #1b5e20;
  }
  
  .testimonials {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
  }
  
  .testimonials h2 {
    color: #2e7d32;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .testimonial-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .testimonial-author {
    margin-top: 1rem;
    font-style: italic;
    text-align: right;
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