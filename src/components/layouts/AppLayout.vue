<template>
    <div class="AppLayout">
        <AppNavbar />
        <main class="main">
          <slot></slot>
        </main>
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p>&copy; 2024 All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
    </div>
</template>


<script>
import AppNavbar from './AppNavbar.vue'
import { onMounted } from "vue"

export default {
  components:{
    AppNavbar
  },
  props: {
    pageTitle: String
  },
  setup(props) {
    
    onMounted(() => {
      document.title = props.pageTitle
    })
  }
}
</script>

<style scoped>
footer {
  background-color: #f8f9fa;
  padding: 20px 0;
}
</style>