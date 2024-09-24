<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
      <span class="brand-text">Welcome to Solo Parent!</span>
    </div>
    <div class="navbar-links">
      <router-link to="/Soloparent" class="nav-link">Assistance</router-link>
      <router-link to="/SoloEvents" class="nav-link">Upcoming Events</router-link>
      <router-link to="/SoloServices" class="nav-link">Services</router-link>
      <router-link to="/Solopublications" class="nav-link">Publications</router-link>
      <button class="logout-button" @click="logout">Sign Out</button>
    </div>
  </nav>

  <div>
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

        <!-- Services Section -->
        <section class="services">
          <h2>Our Services</h2>
          <div class="service-grid">
            <!-- Service Cards -->
            <div class="service">
              <img src="./assets/pwd.jpg" alt="PWDs">
              <p>Persons with Disabilities (PWDs)</p>
            </div>
            <div class="service">
              <img src="./assets/solo_parent.jpg" alt="Solo Parents">
              <p>Solo Parents</p>
            </div>
            <div class="service">
              <img src="./assets/senior_citizen.jpg" alt="Senior Citizens">
              <p>Senior Citizens</p>
            </div>
            <div class="service">
              <img src="./assets/daycare_workers.jpg" alt="Daycare Workers">
              <p>Daycare Workers</p>
            </div>
          </div>
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

        <section class="objectives">
          <h2>Our Objectives</h2>
          <ul>
            <li>To provide accessible social welfare services to all members of the community.</li>
            <li>To promote the well-being and empowerment of marginalized sectors.</li>
            <li>To facilitate the implementation of government programs and policies for social development.</li>
            <li>To foster partnerships and collaborations with stakeholders for sustainable community development.</li>
          </ul>
        </section>

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
        <!-- Your footer content here -->
      </footer>
    </div>
  </div>
</template>

<script>
  // Your script here
</script>

<style>
  .homepage {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  header {
    text-align: center;
    padding: 6rem 2rem;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  header h1 {
    margin-bottom: 1rem;
    font-size: 3.5rem;
  }

  header p {
    color: #ddd;
    font-size: 1.2rem;
  }

  main .banner img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .services {
    margin-top: 4rem;
  }

  .services h2 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.5rem;
    color: #fff;
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;
  }

  .service {
    text-align: center;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
  }

  .service:hover {
    transform: translateY(-5px);
  }

  .service img {
    width: 80%;
    border-radius: 10px;
  }

  .core-values,
  .objectives,
  .government-programs,
  .news-updates {
    text-align: center;
    background-color: #f5f5f5;
    padding: 40px 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
  }

  .core-values h2,
  .objectives h2,
  .government-programs h2,
  .news-updates h2 {
    font-size: 2.4rem;
    margin-bottom: 20px;
    color: #333;
  }

  .core-values ul,
  .objectives ul,
  .government-programs ul,
  .news-updates ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .core-values ul li,
  .objectives ul li,
  .government-programs ul li,
  .news-updates ul li {
    margin-bottom: 10px;
    color: #555;
  }

  .government-programs ul li a,
  .news-updates ul li a {
    text-decoration: none;
    color: #007bff;
    transition: color 0.3s ease;
  }

  .government-programs ul li a:hover,
  .news-updates ul li a:hover {
    color: #0056b3;
  }
</style>
