  <template>
    <div>
      <Navbar />
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
  <br>

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

          <br>
          <section class="objectives">
            <h2>Our Objectives</h2>
            <ul>
              <li>To provide accessible social welfare services to all members of the community.</li>
              <li>To promote the well-being and empowerment of marginalized sectors.</li>
              <li>To facilitate the implementation of government programs and policies for social development.</li>
              <li>To foster partnerships and collaborations with stakeholders for sustainable community development.</li>
            </ul>
          </section>

          <br>
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
    import Navbar from '../components/Navbar.vue';

    export default {
      components: {
        Navbar,
      },
    };
    </script>
    <style>

    .homepage {
      font-family: 'Open Sans', sans-serif; /* Clean and modern font */
      max-width: none; /* Remove max-width for full-bleed effect */
      margin: 0; /* Remove margin for full-bleed effect */
      padding: 2rem; /* Consistent spacing with rem units */
      display: flex;
      flex-direction: column;
      min-height: 100vh; /* Ensures full viewport height */
      background-color: #f5f5f5; /* Light background for better contrast */
    }

    header {
      text-align: center;
      padding: 6rem 2rem; /* More spacing for content */
      border-radius: 8px;
    }

    header h1 {
      margin-bottom: 2rem;
      font-size: 3.2rem; /* Adjust font size for responsiveness */
      color: #333;
    }

    header p {
      color: #777; /* Slightly darker for better readability */
      font-size: 1.2rem; /* Adjust font size for readability */
    }

    main .banner img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .services {
      margin-top: 4rem; /* Consistent spacing */
    }

    .services h2 {
      margin-bottom: 2rem;
      text-align: center;
      font-size: 2.4rem; /* Adjust font size for responsiveness */
      color: #333;
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Two columns */
      grid-gap: 2rem; /* Consistent spacing */
      margin: 0 auto; /* Center the grid horizontally */
      width: fit-content; /* Ensures grid doesn't overflow */
    }

    .service {
      text-align: center;
      padding: 2rem; /* Add padding for content */
      background-color: #fff; /* White background for services */
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    }

    .service img {
      width: 100%; /* Adjust image width if needed */
      border-radius: 8px;
    }
  /* Core Values and Objectives Sections */
  .core-values,
  .objectives {
    text-align: center;
    background-color: #f9f9f9;
    padding: 40px 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .core-values h2,
  .objectives h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
  }

  .core-values ul,
  .objectives ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .core-values ul li,
  .objectives ul li {
    margin-bottom: 10px;
    color: #555;
  }

  /* Government Programs Section */
  .government-programs {
    text-align: center;
    background-color: #f9f9f9;
    padding: 40px 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .government-programs h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
  }

  .government-programs p {
    margin-bottom: 20px;
    color: #555;
  }

  .government-programs ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .government-programs ul li {
    margin-bottom: 10px;
    color: #555;
  }

  .government-programs ul li a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
  }

  .government-programs ul li a:hover {
    color: #007bff;
  }

  /* News and Updates Section */
  .news-updates {
    text-align: center;
    background-color: #f9f9f9;
    padding: 40px 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .news-updates h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
  }

  .news-updates p {
    margin-bottom: 20px;
    color: #555;
  }

  .news-updates ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .news-updates ul li {
    margin-bottom: 10px;
    color: #555;
  }

  .news-updates ul li a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
  }

  .news-updates ul li a:hover {
    color: #007bff;
  }

    </style>