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

<style scoped>
/* Styles for the homepage */

.homepage {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh; /* Ensures the page fills at least the viewport height */
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  background-color: #f0f0f0;
  padding: 60px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
}

header h1 {
  margin-bottom: 20px;
  font-size: 48px;
  color: #333;
}

header p {
  color: #666;
  font-size: 20px;
}

main .banner img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.services {
  margin-top: 40px;
}

.services h2 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 36px;
  color: #333;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service {
  text-align: center;
}

.service img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
