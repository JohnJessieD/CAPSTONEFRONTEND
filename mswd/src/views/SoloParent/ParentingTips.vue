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
        <h1 class="page-title">Parenting Tips for Solo Parents</h1>
  
        <section class="featured-tip">
          <h2>Tip of the Week</h2>
          <div class="featured-tip-content">
            <div class="tip-icon">
              <component :is="featuredTip.icon" size="64" />
            </div>
            <div class="tip-text">
              <h3>{{ featuredTip.title }}</h3>
              <p>{{ featuredTip.description }}</p>
            </div>
          </div>
        </section>
  
        <section class="tip-categories">
          <h2>Parenting Tip Categories</h2>
          <div class="category-grid">
            <div v-for="category in tipCategories" :key="category.id" class="category-card">
              <div class="category-icon">
                <component :is="category.icon" size="48" />
              </div>
              <h3>{{ category.title }}</h3>
              <p>{{ category.description }}</p>
              <a :href="category.link" class="btn-explore">Explore Tips</a>
            </div>
          </div>
        </section>
  
        <section class="quick-tips">
          <h2>Quick Parenting Tips</h2>
          <div class="tips-grid">
            <div v-for="tip in quickTips" :key="tip.id" class="tip-card">
              <div class="tip-icon">
                <component :is="tip.icon" size="32" />
              </div>
              <h3>{{ tip.title }}</h3>
              <p>{{ tip.description }}</p>
            </div>
          </div>
        </section>
  
        <section class="parenting-resources">
          <h2>Additional Parenting Resources</h2>
          <div class="resource-list">
            <a v-for="resource in parentingResources" :key="resource.id" :href="resource.link" class="resource-item">
              <component :is="resource.icon" size="24" />
              <span>{{ resource.title }}</span>
            </a>
          </div>
        </section>
  
        <section class="ask-expert">
          <h2>Ask a Parenting Expert</h2>
          <form @submit.prevent="submitQuestion" class="ask-form">
            <textarea v-model="question" placeholder="Type your parenting question here..." rows="4" class="question-input"></textarea>
            <button type="submit" class="btn-submit">Submit Question</button>
          </form>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronDownIcon, HeartIcon, ClockIcon, BrainIcon, UsersIcon, BookOpenIcon, SmileIcon, SunIcon, MoonIcon, CalendarIcon, MessageCircleIcon, FileTextIcon, GlobeIcon } from 'lucide-vue-next'
  
  const navItems = ref([
    {
      title: 'Assistance',
      links: [
        { to: '/financial-aid', text: 'Financial Aid' },
        { to: '/legal-support', text: 'Legal Support' },
        { to: '/housing-assistance', text: 'Housing Assistance' }
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
  
  const featuredTip = ref({
    title: 'Creating Quality Time',
    description: 'Dedicate 15-30 minutes of undivided attention to your child each day. This focused time can significantly improve your bond and your child\'s emotional well-being.',
    icon: HeartIcon
  })
  
  const tipCategories = ref([
    {
      id: 1,
      title: 'Time Management',
      description: 'Tips for balancing work, personal time, and quality time with your children.',
      icon: ClockIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Emotional Support',
      description: 'Guidance on providing emotional support and building resilience in your children.',
      icon: HeartIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Education & Learning',
      description: 'Strategies to support your child\'s educational journey and foster a love for learning.',
      icon: BookOpenIcon,
      link: '#'
    },
    {
      id: 4,
      title: 'Behavior Management',
      description: 'Effective techniques for managing challenging behaviors and promoting positive ones.',
      icon: BrainIcon,
      link: '#'
    }
  ])
  
  const quickTips = ref([
    {
      id: 1,
      title: 'Establish Routines',
      description: 'Create consistent daily routines to provide structure and security for your children.',
      icon: CalendarIcon
    },
    {
      id: 2,
      title: 'Open Communication',
      description: 'Encourage open dialogue with your children about their feelings and experiences.',
      icon: MessageCircleIcon
    },
    {
      id: 3,
      title: 'Self-Care',
      description: 'Remember to take care of yourself - a happy parent leads to happy children.',
      icon: HeartIcon
    },
    {
      id: 4,
      title: 'Positive Reinforcement',
      description: 'Focus on praising good behavior rather than only addressing negative behavior.',
      icon: SmileIcon
    },
    {
      id: 5,
      title: 'Bedtime Reading',
      description: 'Incorporate bedtime stories to bond with your child and promote literacy.',
      icon: MoonIcon
    },
    {
      id: 6,
      title: 'Outdoor Activities',
      description: 'Spend time outdoors together to promote physical activity and reduce stress.',
      icon: SunIcon
    }
  ])
  
  const parentingResources = ref([
    {
      id: 1,
      title: 'Parenting Books Library',
      icon: BookOpenIcon,
      link: '#'
    },
    {
      id: 2,
      title: 'Online Parenting Courses',
      icon: GlobeIcon,
      link: '#'
    },
    {
      id: 3,
      title: 'Local Parenting Workshops',
      icon: UsersIcon,
      link: '#'
    },
    {
      id: 4,
      title: 'Child Development Guide',
      icon: FileTextIcon,
      link: '#'
    }
  ])
  
  const question = ref('')
  
  const submitQuestion = () => {
    // Here you would typically send the question to a backend service
    console.log('Submitted question:', question.value)
    // Reset the form after submission
    question.value = ''
    // You might also want to show a success message to the user
    alert('Your question has been submitted. An expert will respond soon.')
  }
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
    text-align: center;
  }
  
  .featured-tip {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
  }
  
  .featured-tip-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .tip-icon {
    color: #2e7d32;
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
  
  .ask-form {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .question-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 1rem;
  }
  
  .btn-submit {
    background-color: #2e7d32;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
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
  
    .featured-tip-content {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>