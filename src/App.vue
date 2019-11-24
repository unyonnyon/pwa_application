<template>
  <div id="app">
    <header>
      <template v-if="isAuthenticated">
        <router-link
          to="/"
          class="header-item"
        >
          comments
        </router-link>
        <span
          class="header-item"
          @click="logout"
        >logout</span>
      </template>
      <template v-if="!isAuthenticated">
        <router-link
          to="/login"
          class="header-item"
        >
          login
        </router-link>
        <router-link
          to="/register"
          class="header-item"
        >
          register
        </router-link>
      </template>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
}
</script>>

<style scoped>
.header-item {
  padding: 10px;
  cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
