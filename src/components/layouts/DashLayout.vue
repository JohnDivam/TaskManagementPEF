<template>
    <div class="DashLayout">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <router-link  to="/user/home" class="navbar-brand" href="#">Project Management Tool</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="user" :src="image" alt="" height="30" width="30">
                        <small>{{user.name}} </small>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">
                        <i class="fa-light fa-right-from-bracket"></i> تسجيل الخروج
                      </a>
                    </div>
                  </li>
                </ul>
            </div>
          
          </div>
        </nav>

        <main class="main">
          <div class="yield-content">
            <slot></slot>
          </div>
        </main>
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p>&copy; 2024 All rights reserved. </p>
              </div>
            </div>
          </div>
        </footer>
    </div>
</template>


<script>
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex";

export default {
  props: {
    pageTitle: String,
  },
  setup(props) {
    const store = useStore();

    const user = computed(() => store.getters['userModule/getUser']);

    onMounted(() => {
      document.title = props.pageTitle
    })

    return {
      user,
      image: ref("/src/assets/user.png")
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #f8f9fa;
  padding: 20px 0;
}
</style>