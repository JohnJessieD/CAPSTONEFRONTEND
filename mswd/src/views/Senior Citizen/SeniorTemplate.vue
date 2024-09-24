<template>
  <div>  
    <nav class="navbar">  
      <div class="navbar-brand">
        <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
        <span class="brand-text">Welcome to Municipal SWD!</span>
      </div>
      <div class="navbar-links">
        <br>  
        <router-link to="/Needyadults" class="nav-link">Assistance</router-link>
        <router-link to="/SeniorEvents" class="nav-link">Upcoming Events</router-link>
        <router-link to="/SeniorServices" class="nav-link">Services</router-link>
        <router-link to="/Seniorpublications" class="nav-link">Publications</router-link>
        <router-link to="/SeniorStatus" class="nav-link">Status</router-link>
        <button class="logout-button" @click="logout">Sign Out</button>
      </div>  
    </nav>

    <div class="spacer"></div>
    <div class="homepage">
      <!-- Header -->
      <header>
        <h1>Welcome to MSWD Office</h1>
        <p>Empowering Communities, Uplifting Lives</p>
      </header>

      <!-- Main Content -->
      <main>
        <!-- Banner Section -->
        <section class="banner">
          <img src="./assets/banner.jpg" alt="Government Banner">
        </section>

       
        <!-- Core Values Section -->
        <section class="core-values">
          <h2>Our Core Values</h2>
          <ul>
            <li>Service Excellence</li>
            <li>Community Empowerment</li>
            <li>Transparency and Accountability</li>
            <li>Equity and Social Justice</li>
          </ul>
        </section>

        <!-- Objectives Section -->
        <section class="objectives">
          <h2>Our Objectives</h2>
          <ul>
            <li>To provide accessible social welfare services to all members of the community.</li>
            <li>To promote the well-being and empowerment of marginalized sectors.</li>
            <li>To facilitate the implementation of government programs and policies for social development.</li>
            <li>To foster partnerships and collaborations with stakeholders for sustainable community development.</li>
          </ul>
        </section>

        <!-- Government Programs Section -->
        <section class="government-programs">
          <h2>Government Programs</h2>
          <p>Explore our government programs aimed at improving the lives of citizens:</p>
          <ul>
            <li><a href="#">Livelihood Assistance Program</a></li>
            <li><a href="#">Healthcare Subsidies</a></li>
            <li><a href="#">Education Support Initiatives</a></li>
            <li><a href="#">Housing Assistance</a></li>
          </ul>
        </section>

        <!-- News and Updates Section -->
        <section class="news-updates">
          <h2>News and Updates</h2>
          <p>Stay informed with the latest news and updates from the MSWD Office:</p>
          <ul>
            <li><a href="#">Community Outreach Event Recap</a></li>
            <li><a href="#">New Social Welfare Programs Launched</a></li>
            <li><a href="#">COVID-19 Relief Efforts Update</a></li>
            <li><a href="#">Upcoming Workshops and Seminars</a></li>
          </ul>
        </section>
      </main>

      <!-- Footer -->
      <footer>
        <!-- Footer content here -->
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.homepage {
  font-family: 'Open Sans', sans-serif;
  max-width: none;
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #f5f5f5;
}

header {
  text-align: center;
  padding: 6rem 2rem;
  border-radius: 8px;
}

header h1 {
  margin-bottom: 2rem;
  font-size: 3.2rem;
  color: #333;
}

header p {
  color: #777;
  font-size: 1.2rem;
}

main .banner img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.services {
  margin-top: 4rem;
}

.services h2 {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.4rem;
  color: #333;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  margin: 0 auto;
  width: fit-content;
}

.service {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.service img {
  width: 100%;
  border-radius: 8px;
}

/* Core Values, Government Programs, and News Sections without container */
.core-values,
.government-programs,
.news-updates {
  text-align: center;
  padding: 40px 20px;
  margin: 2rem 0;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
}

.core-values h2,
.government-programs h2,
.news-updates h2 {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.core-values ul,
.government-programs ul,
.news-updates ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.core-values ul li,
.government-programs ul li,
.news-updates ul li {
  margin-bottom: 10px;
  color: #555;
}

.government-programs ul li a,
.news-updates ul li a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

.government-programs ul li a:hover,
.news-updates ul li a:hover {
  color: #007bff;
}

/* Navbar styling */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
}

.logo-img {
  width: 50px;
  margin-right: 0.5rem;
}

.navbar-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.logout-button {
  background-color: #fff;
  color: #333;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #e0e0e0;
}
</style>
