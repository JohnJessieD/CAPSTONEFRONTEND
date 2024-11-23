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
        <h1 class="page-title">Health & Wellness for Solo Parents</h1>
        
        <section class="wellness-categories">
          <h2>Wellness Resources</h2>
          <div class="category-grid">
            <div v-for="category in wellnessCategories" :key="category.id" class="category-card">
              <div class="category-icon">
                <component :is="category.icon" size="48" />
              </div>
              <h3>{{ category.title }}</h3>
              <p>{{ category.description }}</p>
              <a :href="category.link" class="btn-explore">Explore</a>
            </div>
          </div>
        </section>
    
        <section class="self-care-tips">
          <h2>Self-Care Tips for Solo Parents</h2>
          <div class="tips-grid">
            <div v-for="tip in selfCareTips" :key="tip.id" class="tip-card">
              <div class="tip-icon">
                <component :is="tip.icon" size="32" />
              </div>
              <h3>{{ tip.title }}</h3>
              <p>{{ tip.description }}</p>
            </div>
          </div>
        </section>
    
        <section class="wellness-events">
          <h2>Upcoming Wellness Events</h2>
          <div class="event-list">
            <div v-for="event in wellnessEvents" :key="event.id" class="event-card">
              <div class="event-date">
                <span class="day">{{ event.day }}</span>
                <span class="month">{{ event.month }}</span>
              </div>
              <div class="event-details">
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
                <div class="event-meta">
                  <span><ClockIcon size="16" /> {{ event.time }}</span>
                  <span><MapPinIcon size="16" /> {{ event.location }}</span>
                </div>
                <a :href="event.link" class="btn-register">Register</a>
              </div>
            </div>
          </div>
        </section>
    
        <section class="health-resources">
          <h2>Health Resources</h2>
          <div class="resource-list">
            <a v-for="resource in healthResources" :key="resource.id" :href="resource.link" class="resource-item">
              <component :is="resource.icon" size="24" />
              <span>{{ resource.title }}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { HeartIcon, BrainIcon, UserIcon, LeafIcon, SunIcon, MoonIcon, UtensilsIcon, DumbbellIcon, ClockIcon, MapPinIcon, PhoneIcon, FileTextIcon, GlobeIcon, ChevronDownIcon } from 'lucide-vue-next'
  
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
  
  const wellnessCategories = ref([
    {
      id: 1,
      title: 'Physical Health',
      description: 'Resources for maintaining physical well-being, including exercise tips and nutrition guides.',
      icon: HeartIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Mental Health',
      description: 'Support for mental health, including stress management and mindfulness techniques.',
      icon: BrainIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Social Well-being',
      description: 'Tips for maintaining social connections and building a support network.',
      icon: UserIcon,
      link: '#'
    },
    {
      id: 4,
      title: 'Holistic Wellness',
      description: 'Explore holistic approaches to health, including alternative therapies and natural remedies.',
      icon: LeafIcon,
      link: '#'
    }
  ])
  
  const selfCareTips = ref([
    {
      id: 1,
      title: 'Prioritize Sleep',
      description: 'Aim for 7-9 hours of sleep per night to recharge and maintain overall health.',
      icon: MoonIcon
    },
    {
      id: 2,
      title: 'Practice Mindfulness',
      description: 'Take a few minutes each day for meditation or deep breathing exercises.',
      icon: BrainIcon
    },
    {
      id: 3,
      title: 'Eat Nutritious Meals',
      description: 'Fuel your body with balanced, healthy meals to maintain energy levels.',
      icon: UtensilsIcon
    },
    {
      id: 4,
      title: 'Regular Exercise',
      description: 'Incorporate at least 30 minutes of physical activity into your daily routine.',
      icon: DumbbellIcon
    },
    {
      id: 5,
      title: 'Enjoy Sunlight',
      description: 'Spend time outdoors to boost vitamin D and improve mood.',
      icon: SunIcon
    },
    {
      id: 6,
      title: 'Connect with Others',
      description: 'Maintain social connections with friends, family, or support groups.',
      icon: UserIcon
    }
  ])
  
  const wellnessEvents = ref([
    {
      id: 1,
      title: 'Yoga for Stress Relief',
      description: 'A gentle yoga session designed for solo parents to relieve stress and promote relaxation.',
      day: '10',
      month: 'Aug',
      time: '7:00 PM - 8:30 PM',
      location: 'Community Center',
      link: '#'
    },
    {
      id: 2,
      title: 'Nutrition Workshop',
      description: 'Learn quick and healthy meal prep ideas for busy solo parents.',
      day: '15',
      month: 'Aug',
      time: '6:30 PM - 8:00 PM',
      location: 'Online Webinar',
      link: '#'
    },
    {
      id: 3,
      title: 'Mental Health Support Group',
      description: 'Join fellow solo parents in a supportive environment to discuss mental health challenges and coping strategies.',
      day: '20',
      month: 'Aug',
      time: '7:00 PM - 8:30 PM',
      location: 'Community Center',
      link: '#'
    }
  ])
  
  const healthResources = ref([
    {
      id: 1,
      title: 'Find a Healthcare Provider',
      icon: PhoneIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Mental Health Hotline',
      icon: PhoneIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Health Insurance Guide',
      icon: FileTextIcon,
      link: '#'
    },
    {
      id: 4,
      title: 'Online Health Assessment',
      icon: GlobeIcon,
      link: '#'
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
  
  section {
    margin-bottom: 3rem;
  }
  
  h2 {
    font-size: 2rem;
    color: #2e7d32;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .category-grid, .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .category-card, .tip-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .category-card:hover, .tip-card:hover {
    transform: translateY(-5px);
  }
  
  .category-icon, .tip-icon {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .btn-explore {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-explore:hover {
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
  
  .event-meta {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
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
  
  .resource-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .resource-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s ease;
  }
  
  .resource-item:hover {
    background-color: #f0f8f0;
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
  
    .event-card {
      flex-direction: column;
    }
  
    .event-date {
      padding: 0.5rem;
      flex-direction: row;
      justify-content: center;
      gap: 0.5rem;
    }
  }
  </style>