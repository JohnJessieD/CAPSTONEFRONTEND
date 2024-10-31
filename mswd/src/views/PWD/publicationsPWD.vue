<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <router-link to="/temlpatep" class="nav-link">Home</router-link>
        <router-link to="/Pwd" class="nav-link">Assistance</router-link>
        <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
        <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
        
        <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
      </div>
    </nav>

    <main class="main-content">
      <h1 class="page-title">MSWD Publications</h1>
      <div class="publications-container">
        <ul class="publication-list">
          <li v-for="publication in publications" :key="publication.id" class="publication-item">
            <div class="publication-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="publication-content">
              <h2 class="publication-title">{{ publication.title }}</h2>
              <p class="publication-date">{{ formatDate(publication.date) }}</p>
              <p class="publication-description">{{ publication.description }}</p>
              <button class="read-more-button">Read More</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Publications',
  data() {
    return {
      publications: [
        { id: 1, title: 'Annual Report 2023', date: '2024-01-01', description: 'A comprehensive overview of our achievements, challenges, and future plans for the Municipal Social Welfare and Development office.' },
        { id: 2, title: 'Monthly Newsletter - March 2024', date: '2024-03-15', description: 'Stay updated with the latest news, events, and success stories from our community welfare programs.' },
        { id: 3, title: 'Guide to Social Welfare Programs', date: '2024-04-05', description: 'An in-depth look at our various social welfare programs, eligibility criteria, and application processes.' },
        { id: 4, title: 'Community Health Initiative Report', date: '2024-02-20', description: 'Detailed analysis of our recent community health programs, their impact, and future health initiatives.' },
        { id: 5, title: 'Youth Empowerment Whitepaper', date: '2024-03-30', description: 'Exploring strategies and programs aimed at empowering the youth in our municipality.' }
      ],
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
}

.navbar {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.brand-text {
  color: #004d7a;
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #f0f4f8;
  color: #004d7a;
}

.logout-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff5252;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #004d7a;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.publications-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.publication-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 2rem;
}

.publication-item {
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.publication-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.publication-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
}

.icon {
  width: 40px;
  height: 40px;
  color: #004d7a;
}

.publication-content {
  flex-grow: 1;
  padding: 1.5rem;
}

.publication-title {
  font-size: 1.4rem;
  color: #004d7a;
  margin-bottom: 0.5rem;
}

.publication-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.publication-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more-button {
  background-color: #004d7a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.read-more-button:hover {
  background-color: #003a5c;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    margin-bottom: 0.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .publication-item {
    flex-direction: column;
  }

  .publication-icon {
    width: 100%;
    height: 100px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>