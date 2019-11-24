<template>
  <div>
    <h3>post</h3>
    <label for="name">name</label>
    <input
      id="name"
      v-model="name"
      type="text"
    >
    <br>
    <br>
    <label for="comment">comment :</label>
    <textarea
      id="comment"
      v-model="comment"
    />
    <br>
    <button @click="post">
      postbtn
    </button>
    <h3>掲示板</h3>
    <div
      v-for="postitem in posts"
      :key="postitem.name"
    >
      <br>
      <p>name: {{ postitem.fields.name.stringValue }}</p>
      <p>comment: {{ postitem.fields.comment.stringValue }}</p>
    </div>
  </div>
</template>

<script>
import  axios from "axios";

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {
    axios.get(
        "/comments",
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
    )
    .then(response => {
      this.posts = response.data.documents;
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    post() {
      axios.post(
        "/comments",
        {
          fields:{
            name: {
              stringValue:this.name
            },
            comment: {
              stringValue:this.comment
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.comment="";
      this.name="";
    }
  }
}
</script>>

<style>

</style>
