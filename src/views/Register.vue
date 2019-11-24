<template>
  <div>
    <h3>Register</h3>
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
    <button @click="register">
      register
    </button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    register(){
        this.$store.dispatch('register', {
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
