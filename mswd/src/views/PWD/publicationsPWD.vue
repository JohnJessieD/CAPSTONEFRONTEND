<template>
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
      <router-link to="/Status" class="nav-link">Status</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>
  </nav>

  <div class="spacer"></div>

  <main class="main-content">
    <h2 class="publications-title">Publications</h2>
    <ul class="publication-list">
      <li v-for="publication in publications" :key="publication.id" class="publication-item">
        <h3>{{ publication.title }}</h3>
        <p class="publication-date"><strong>Date:</strong> {{ publication.date }}</p>
        <p class="publication-description">{{ publication.description }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'Publications',
  data() {
    return {
      publications: [
        { id: 1, title: 'Annual Report 2023', date: 'January 1, 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
        { id: 2, title: 'Monthly Newsletter - March 2024', date: 'March 15, 2024', description: 'Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.' },
        { id: 3, title: 'Guide to Social Welfare Programs', date: 'April 5, 2024', description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.' },
        // Add more publications as needed
      ],
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.spacer {
  height: 100px; /* Adjust the height for desired spacing */
}

.main-content {
  max-width: 900px; /* Limit max width for better readability */
  margin: 0 auto; /* Center the content */
  padding: 20px; /* Padding for main content */
}

.publications-title {
  text-align: center; /* Center the title */
  font-size: 2rem; /* Larger font size for emphasis */
  margin-bottom: 30px; /* Space below title */
  color: #004d7a; /* Match navbar color for consistency */
}

.publication-list {
  list-style-type: none;
  padding: 0;
  display: grid; /* Use grid layout for items */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive grid */
  gap: 20px; /* Space between items */
}

.publication-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff; /* White background for publication items */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
}

.publication-item:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
}

.publication-item h3 {
  margin-top: 0;
  color: #333; /* Darker color for the title */
}

.publication-date {
  color: #777; /* Lighter color for the date */
}

.publication-description {
  margin-top: 10px;
  color: #555; /* Darker color for the description */
}
</style>
