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
                <router-link v-for="link in item.links" :key="link.to" :to="link.to">{{ link.text }}</router-link>
              </div>
            </div>
            <button class="logout-button" @click="logout">Sign Out</button>
          </div>
        </div>
      </nav>
  
      <main class="page-container">
        <h1 class="page-title">Education Resources for Solo Parents</h1>
  
        <section class="education-resources">
          <h2>Educational Support Programs</h2>
          <div class="resource-grid">
            <div v-for="program in educationPrograms" :key="program.id" class="resource-card">
              <div class="resource-icon">
                <component :is="program.icon" size="48" />
              </div>
              <h3>{{ program.title }}</h3>
              <p>{{ program.description }}</p>
              <a :href="program.link" class="btn-learn-more">Learn More</a>
            </div>
          </div>
        </section>
  
        <section class="scholarship-opportunities">
          <h2>Scholarship Opportunities</h2>
          <ul class="scholarship-list">
            <li v-for="scholarship in scholarships" :key="scholarship.id" class="scholarship-item">
              <h3>{{ scholarship.name }}</h3>
              <p>{{ scholarship.description }}</p>
              <div class="scholarship-details">
                <CalendarIcon size="16" />
                <span>Deadline: {{ scholarship.deadline }}</span>
              </div>
              <a :href="scholarship.link" class="btn-apply">Apply Now</a>
            </li>
          </ul>
        </section>
  
        <section class="educational-resources">
          <h2>Free Online Learning Resources</h2>
          <div class="resource-grid">
            <div v-for="resource in onlineResources" :key="resource.id" class="resource-card">
              <div class="resource-icon">
                <component :is="resource.icon" size="48" />
              </div>
              <h3>{{ resource.name }}</h3>
              <p>{{ resource.description }}</p>
              <a :href="resource.link" class="btn-explore">Explore</a>
            </div>
          </div>
        </section>
  
        <section class="education-tips">
          <h2>Education Tips for Solo Parents</h2>
          <ul class="tips-list">
            <li v-for="tip in educationTips" :key="tip.id" class="tip-item">
              <div class="tip-icon">
                <component :is="tip.icon" size="24" />
              </div>
              <div class="tip-content">
                <h3>{{ tip.title }}</h3>
                <p>{{ tip.description }}</p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronDownIcon, BookOpenIcon, GraduationCapIcon, LaptopIcon, BrainIcon, ClockIcon, CalendarIcon, UsersIcon, PiggyBankIcon } from 'lucide-vue-next'
  
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
  
  const educationPrograms = ref([
    {
      id: 1,
      title: 'Adult Education Classes',
      description: 'Free classes for solo parents to complete their high school education or learn new skills.',
      icon: BookOpenIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'College Preparation Program',
      description: 'Guidance and support for solo parents interested in pursuing higher education.',
      icon: GraduationCapIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Vocational Training',
      description: 'Skill-based training programs to enhance career opportunities for solo parents.',
      icon: LaptopIcon,
      link: '#'
    }
  ])
  
  const scholarships = ref([
    {
      id: 1,
      name: 'Solo Parent Achievement Scholarship',
      description: 'Annual scholarship for outstanding solo parents pursuing higher education.',
      deadline: 'September 30, 2023',
      link: '#'
    },
    {
      id: 2,
      name: 'Community College Bridge Program',
      description: 'Financial assistance for solo parents transitioning to community college.',
      deadline: 'August 15, 2023',
      link: '#'
    },
    {
      id: 3,
      name: 'Vocational Training Grant',
      description: 'Funding for solo parents enrolling in vocational or technical training programs.',
      deadline: 'Rolling applications',
      link: '#'
    }
  ])
  
  const onlineResources = ref([
    {
      id: 1,
      name: 'Khan Academy',
      description: 'Free online courses covering a wide range of subjects for all ages.',
      icon: LaptopIcon,
      link: '#'
    },
    {
      id: 2,
      name: 'Coursera',
      description: 'Online learning platform offering courses from top universities and organizations.',
      icon: GraduationCapIcon,
      link: '#'
    },
    {
      id: 3,
      name: 'Local Library E-Resources',
      description: 'Access to e-books, audiobooks, and online learning materials through your local library.',
      icon: BookOpenIcon,
      link: '#'
    }
  ])
  
  const educationTips = ref([
    {
      id: 1,
      title: 'Create a Study Schedule',
      description: 'Set aside dedicated time for studying and stick to a consistent schedule.',
      icon: ClockIcon
    },
    {
      id: 2,
      title: 'Utilize Community Resources',
      description: 'Take advantage of free tutoring services and study groups in your community.',
      icon: UsersIcon
    },
    {
      id: 3,
      title: 'Explore Financial Aid Options',
      description: 'Research and apply for grants, scholarships, and financial aid programs specifically for solo parents.',
      icon: PiggyBankIcon
    },
    {
      id: 4,
      title: 'Balance Education and Parenting',
      description: 'Involve your children in your educational journey and make studying a family activity when possible.',
      icon: BrainIcon
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
  
  section {
    margin-bottom: 3rem;
  }
  
  h2 {
    font-size: 2rem;
    color: #2e7d32;
    margin-bottom: 1.5rem;
  }
  
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .resource-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
  }
  
  .resource-icon {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .btn-learn-more, .btn-apply, .btn-explore {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-learn-more:hover, .btn-apply:hover, .btn-explore:hover {
    background-color: #1b5e20;
  }
  
  .scholarship-list {
    list-style-type: none;
    padding: 0;
  }
  
  .scholarship-item {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .scholarship-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
    color: #666;
  }
  
  .tips-list {
    list-style-type: none;
    padding: 0;
  }
  
  .tip-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .tip-icon {
    color: #2e7d32;
    flex-shrink: 0;
  }
  
  .tip-content h3 {
    margin: 0 0 0.5rem 0;
    color: #2e7d32;
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
    .resource-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>