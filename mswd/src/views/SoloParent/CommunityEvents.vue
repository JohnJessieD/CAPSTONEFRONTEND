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
        <h1 class="page-title">Community Events for Solo Parents</h1>
        <div class="event-list">
          <div v-for="event in events" :key="event.id" class="event-card">
            <img :src="event.image" :alt="event.title" class="event-image" />
            <div class="event-content">
              <h2>{{ event.title }}</h2>
              <p>{{ event.description }}</p>
              <div class="event-details">
                <div class="detail-item">
                  <CalendarIcon size="16" />
                  <span>{{ event.date }}</span>
                </div>
                <div class="detail-item">
                  <ClockIcon size="16" />
                  <span>{{ event.time }}</span>
                </div>
                <div class="detail-item">
                  <MapPinIcon size="16" />
                  <span>{{ event.location }}</span>
                </div>
              </div>
              <a :href="event.link" class="btn-rsvp">RSVP</a>
            </div>
          </div>
        </div>
        <section class="event-calendar">
          <h2>Upcoming Events Calendar</h2>
          <p>Stay tuned for our interactive calendar feature, coming soon!</p>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ChevronDownIcon, CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-vue-next';
  
  const navItems = ref([
    {
      title: 'Assistance',
      links: [
        { to: '/financialaid', text: 'Financial Aid' },
        { to: '/legalsupport', text: 'Legal Support' },
        { to: '/housingassistance', text: 'Housing Assistance' },
      ],
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
  ]);
  
  const events = ref([
    {
      id: 1,
      title: 'Family Fun Day in the Park',
      description:
        'Join us for a day of games, picnics, and fun activities for solo parents and their children.',
      date: 'July 20, 2023',
      time: '11:00 AM - 4:00 PM',
      location: 'Central Park',
      image: '/placeholder.svg?height=200&width=300',
      link: '#',
    },
    {
      id: 2,
      title: "Solo Parents' Night Out",
      description: 'An evening of relaxation and socializing for solo parents. Childcare provided.',
      date: 'August 5, 2023',
      time: '7:00 PM - 10:00 PM',
      location: 'Community Center',
      image: '/placeholder.svg?height=200&width=300',
      link: '#',
    },
    {
      id: 3,
      title: 'Back-to-School Supply Drive',
      description: 'Help solo parent families prepare for the new school year with our supply drive.',
      date: 'August 15, 2023',
      time: '9:00 AM - 2:00 PM',
      location: 'Local High School Gymnasium',
      image: '/placeholder.svg?height=200&width=300',
      link: '#',
    },
    {
      id: 4,
      title: 'Community Potluck Dinner',
      description:
        'Bring your favorite dish and join other solo parent families for a community dinner.',
      date: 'September 2, 2023',
      time: '6:00 PM - 8:30 PM',
      location: 'Community Garden',
      image: '/placeholder.svg?height=200&width=300',
      link: '#',
    },
  ]);
  
  const logout = () => {
    console.log('Logging out...');
  };
  </script>
  <style scoped>
  /* Navbar Styles */
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
  
  /* Page Container Styles */
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
  
  /* Event List Styles */
  .event-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .event-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .event-card:hover {
    transform: translateY(-5px);
  }
  
  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .event-content {
    padding: 1.5rem;
  }
  
  .event-details {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
  }
  
  .btn-rsvp {
    display: inline-block;
    background-color: #2e7d32;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-rsvp:hover {
    background-color: #1b5e20;
  }
  
  /* Event Calendar Styles */
  .event-calendar {
    background-color: #f0f8f0;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
  }
  
  .event-calendar h2 {
    color: #2e7d32;
    margin-bottom: 1rem;
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .container {
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
  
  @media (max-width: 768px) {
    .event-list {
      grid-template-columns: 1fr;
    }
  }
  </style>
  