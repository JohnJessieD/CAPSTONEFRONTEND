<template>
    <div class="office-item" @click="goToRouterLink(office.routerPath)">
      <img :src="require(`@/assets/${office.image}`)" alt="Office Image" />
      <div>
        <h3>{{ office.name }}</h3>
        <button @click.stop="goToRouterLink(office.routerPath)">Go to Office</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      office: {
        type: Object,
        required: true,
      },
    },
    methods: {
      goToRouterLink(path) {
        this.$router.push(path);
      },
    },
  };
  </script>
  
  <style scoped>
  .office-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .office-item:hover {
    background-color: #e6e6e6;
  }
  
  img {
    max-width: 100px; /* Set the maximum width of the image */
    margin-right: 10px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  