<template>
    <div>  <nav class="navbar">  <div class="navbar-brand">
          <img src="/img/Download.jpg" class="logo-img" alt="Government Logo" />
          <span class="brand-text">Welcome to Municipal SWD!</span>
        </div>
        <div class="navbar-links">
          <router-link to="/temlpatep" class="nav-link">Home</router-link>
          <br>
          <router-link to="/Pwd" class="nav-link">Assistance</router-link>
          <router-link to="/EventsPWD" class="nav-link">Upcoming Events</router-link>
          <router-link to="/ServicesPWD" class="nav-link">Services</router-link>
          <router-link to="/publicationsPWD" class="nav-link">Publications</router-link>
          <router-link to="/CPWD" class="nav-link">Contact Us</router-link>
          <button class="logout-button" @click="logout">Sign Out</button>
        
      </div>  
    </nav>
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

          <br>
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
  export default {
    methods: {
      logout() {
        // Perform logout actions (e.g., clear session, redirect to login page)
        // You need to replace '/login' with the correct path to your login page
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
  background-image: url('C:\laragon\www\CAPSTONEFRONTEND\mswd\public\img\images.png'); /* Replace 'path/to/your/background/image.jpg' with the actual path to your image */
  background-size: cover; /* Cover the entire background */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-attachment: fixed; /* Fixed background position */
  background-color: #f5f5f5;
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
  }.navbar {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem; /* Adjusted padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 1024px;
  margin: 0 auto; /* Center the navbar horizontally */
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
  margin-right: 0.5rem; /* Adjusted margin */
}

.brand-text {
  font-family: 'Poppins', sans-serif;
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
  padding: 0.8rem 1rem; /* Adjusted padding */
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
  padding: 0.8rem 1rem; /* Adjusted padding */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #e0e0e0;
} 


    </style>