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
        <h1 class="page-title">Job Training for Solo Parents</h1>
        <div class="program-grid">
          <div v-for="program in jobTrainingPrograms" :key="program.id" class="program-card">
            <div class="program-icon">
              <component :is="program.icon" size="48" />
            </div>
            <h2>{{ program.title }}</h2>
            <p>{{ program.description }}</p>
            <ul class="program-details">
              <li><ClockIcon size="16" /> Duration: {{ program.duration }}</li>
              <li><CalendarIcon size="16" /> Start Date: {{ program.startDate }}</li>
              <li><MapPinIcon size="16" /> Location: {{ program.location }}</li>
            </ul>
            <a :href="program.link" class="btn-enroll">Enroll Now</a>
          </div>
        </div>
        <section class="success-stories">
          <h2>Success Stories</h2>
          <div class="story-grid">
            <div v-for="story in successStories" :key="story.id" class="story-card">
              <img :src="story.image" :alt="story.name" class="story-image">
              <h3>{{ story.name }}</h3>
              <p>"{{ story.quote }}"</p>
              <span class="story-program">{{ story.program }}</span>
            </div>
          </div>
        </section>
        <section class="career-resources">
          <h2>Career Resources</h2>
          <div class="resource-grid">
            <a v-for="resource in careerResources" :key="resource.id" :href="resource.link" class="resource-card">
              <component :is="resource.icon" size="32" />
              <h3>{{ resource.title }}</h3>
            </a>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { BriefcaseIcon, CodeIcon, PencilIcon, WrenchIcon, ClockIcon, CalendarIcon, MapPinIcon, FileTextIcon, UserIcon, GlobeIcon, ChevronDownIcon } from 'lucide-vue-next'
  
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
  
  const jobTrainingPrograms = ref([
    {
      id: 1,
      title: 'Administrative Assistant Certification',
      description: 'Comprehensive training in office management and administrative skills.',
      icon: BriefcaseIcon,
      duration: '12 weeks',
      startDate: 'August 1, 2023',
      location: 'Online & In-person',
      link: '#'
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      description: 'Intensive coding program to become a full-stack web developer.',
      icon: CodeIcon,
      duration: '16 weeks',
      startDate: 'September 5, 2023',
      location: 'Online',
      link: '#'
    },
    {
      id: 3,
      title: 'Graphic Design Fundamentals',
      description: 'Learn the basics of graphic design and industry-standard software.',
      icon: PencilIcon,
      duration: '8 weeks',
      startDate: 'July 15, 2023',
      location: 'Community Center',
      link: '#'
    },
    {
      id: 4,
      title: 'HVAC Technician Training',
      description: 'Hands-on training to become a certified HVAC technician.',
      icon: WrenchIcon,
      duration: '24 weeks',
      startDate: 'August 15, 2023',
      location: 'Technical Institute',
      link: '#'
    }
  ])
  
  const successStories = ref([
    {
      id: 1,
      name: 'Sarah M.',
      quote: 'The Web Development Bootcamp changed my life. I now have a flexible, high-paying job that allows me to be there for my kids.',
      image: '/placeholder.svg?height=100&width=100',
      program: 'Web Development Bootcamp'
    },
    {
      id: 2,
      name: 'Michael T.',
      quote: 'As a single dad, the HVAC training program gave me the skills to provide a stable income for my family.',
      image: '/placeholder.svg?height=100&width=100',
      program: 'HVAC Technician Training'
    }
  ])
  
  const careerResources = ref([
    {
      id: 1,
      title: 'Resume Writing Guide',
      icon: FileTextIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Interview Preparation',
      icon: UserIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Job Search Strategies',
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
  
  .program-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .program-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .program-card:hover {
    transform: translateY(-5px);
  }
  
  .program-icon {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  .program-details {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
  }
  
  .program-details li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #666;
  }
  
  .btn-enroll {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .btn-enroll:hover {
    background-color: #1b5e20;
  }
  
  .success-stories {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 3rem;
  }
  
  .success-stories h2 {
    color: #2e7d32;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .story-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .story-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  
  .story-program {
    display: block;
    margin-top: 0.5rem;
    font-style: italic;
    color: #666;
  }
  
  .career-resources h2 {
    color: #2e7d32;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .resource-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-decoration: none;
    color: #333;
    transition: transform 0.3s ease;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
  }
  
  .resource-card h3 {
    margin-top: 1rem;
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