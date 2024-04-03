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
        <section class="banner">
          <img src="./assets/banner.jpg" alt="Government Banner">
        </section>

        <section class="services">
          <h2>Our Services</h2>
          <div class="service-grid">
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
</style>