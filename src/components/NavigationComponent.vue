<template>
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="link in navigationLinks">
          <router-link :to="link.to" class="nav-button" :class="{ active: currentView === link.label }">
            {{ link.label }}
          </router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentView: 'Songs', 
        navigationLinks: [
          { label: 'Songs', to: '/' },
          { label: 'Albums', to: '/Albums' },
          { label: 'About', to: '/About' },
        ],
      };
    },
  };
  </script>