<template>
  
  <div class="contact-container">
    <div class="contact-section">
      <h2>Contact Us</h2>
      <div class="contact-info">
        <p><strong>Phone:</strong> {{ phone }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
      </div>
    </div>

    <!-- Additional Contacts -->
    <div class="additional-contacts-section">
      <h3>Additional Contacts</h3>
      <div class="additional-contacts">
        <div class="office-contact">
          <h4>Senior Office</h4>
          <p><strong>Name:</strong> {{ seniorOfficer.name }}</p>
          <p><strong>Phone:</strong> {{ seniorOfficer.phone }}</p>
          <p><strong>Email:</strong> {{ seniorOfficer.email }}</p>
        </div>
        
        <div class="office-contact">
          <h4>Day Care Center</h4>
          <p><strong>Name:</strong> {{ dayCareWorker.name }}</p>
          <p><strong>Phone:</strong> {{ dayCareWorker.phone }}</p>
          <p><strong>Email:</strong> {{ dayCareWorker.email }}</p>
        </div>
        
        <div class="office-contact">
          <h4>Disaster Management</h4>
          <p><strong>Name:</strong> {{ disasterCoordinator.name }}</p>
          <p><strong>Phone:</strong> {{ disasterCoordinator.phone }}</p>
          <p><strong>Email:</strong> {{ disasterCoordinator.email }}</p>
        </div>
        
        <div class="office-contact">
          <h4>Persons with Disabilities (PWD) Support</h4>
          <p><strong>Name:</strong> {{ pwdSupportOfficer.name }}</p>
          <p><strong>Phone:</strong> {{ pwdSupportOfficer.phone }}</p>
          <p><strong>Email:</strong> {{ pwdSupportOfficer.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
 
  name: 'ContactUs',
  data() {
    return {
      phone: '+63 987 654 321',
      email: 'hello@santeodorophilippines.com',
      address: 'Unit 101, Acacia Building, San Teodoro Street, Barangay Buensuceso, San Teodoro, Oriental Mindoro, Philippines',
      seniorOfficer: {
        name: 'John Doe',
        phone: '+63 912 345 678',
        email: 'seniorofficer@santeodorophilippines.com'
      },
      dayCareWorker: {
        name: 'Jane Smith',
        phone: '+63 921 876 543',
        email: 'daycareworker@santeodorophilippines.com'
      },
      disasterCoordinator: {
        name: 'David Lee',
        phone: '+63 933 987 654',
        email: 'disastercoordinator@santeodorophilippines.com'
      },
      pwdSupportOfficer: {
        name: 'Maria Garcia',
        phone: '+63 945 321 789',
        email: 'pwdsupport@santeodorophilippines.com'
      }
    };
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 800px;
  margin: 0 auto;
  padding:150px;
}

.contact-section {
  margin-bottom: 40px;
}

.contact-info {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}

.additional-contacts-section {
  margin-bottom: 40px;
}

.additional-contacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.office-contact {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}
</style>
