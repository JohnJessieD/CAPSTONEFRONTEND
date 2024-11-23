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
        <h1 class="page-title">Counseling Services for Solo Parents</h1>
        <div class="service-grid">
          <div v-for="service in counselingServices" :key="service.id" class="service-card">
            <div class="service-icon">
              <component :is="service.icon" size="48" />
            </div>
            <h2>{{ service.title }}</h2>
            <p>{{ service.description }}</p>
            <a :href="service.link" class="btn-book">Book Session</a>
          </div>
        </div>
        <section class="how-it-works">
          <h2>How Our Counseling Services Work</h2>
          <div class="steps">
            <div class="step">
              <div class="step-icon">
                <ClipboardIcon size="32" />
              </div>
              <h3>1. Initial Assessment</h3>
              <p>Complete a brief questionnaire to help us understand your needs.</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <UserIcon size="32" />
              </div>
              <h3>2. Therapist Matching</h3>
              <p>We'll match you with a counselor specializing in solo parent challenges.</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <CalendarIcon size="32" />
              </div>
              <h3>3. Schedule Session</h3>
              <p>Choose a convenient time for your in-person or virtual session.</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <HeartHandshakeIcon size="32" />
              </div>
              <h3>4. Ongoing Support</h3>
              <p>Receive continuous support through regular sessions and check-ins.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { BrainIcon, UsersIcon, HeartIcon, SmileIcon, ClipboardIcon, UserIcon, CalendarIcon, HeartHandshakeIcon, ChevronDownIcon } from 'lucide-vue-next'
  
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
  
  const counselingServices = ref([
    {
      id: 1,
      title: 'Individual Counseling',
      description: 'One-on-one sessions to address personal challenges and growth.',
      icon: BrainIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Family Therapy',
      description: 'Sessions involving children to improve family dynamics and communication.',
      icon: UsersIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Grief Counseling',
      description: 'Support for those dealing with loss or major life changes.',
      icon: HeartIcon,
      link: '#'
    },
    {
      id: 4,
      title: 'Child Counseling',
      description: 'Specialized sessions to help children adjust to family changes.',
      icon: SmileIcon,
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
  
  .btn-book {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-book:hover {
    background-color: #1b5e20;
  }
  
  .how-it-works {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
    margin-top: 3rem;
  }
  
  .how-it-works h2 {
    color: #2e7d32;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .step {
    text-align: center;
  }
  
  .step-icon {
    background-color: #2e7d32;
    color: white;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 1rem;
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