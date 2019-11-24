<template>
  <div>
    <h3>Login</h3>
    <label for="email">email</label>
    <input
      id="email"
      v-model="email"
      type="text"
    >
    <br>
    <br>
    <label for="password">password</label>
    <input
      id="password"
      v-model="password"
      type="password"
    >
    <br>
    <button @click="login">
      login
    </button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login(){
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password
        });
        this.email = "";
        this.password = "";
    }
  }
}
</script>>

<style>

</style>
