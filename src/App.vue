<template>
  <div id="app">
    <div class="navbar navbar-expand-md navbar-light">
      <div class="container">
        <div class="collapse navbar-collapse">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="navbar-nav">
                <a href="#" class="navbar-brand">Qwerty</a>
                <router-link active-class="active" class="nav-item nav-link" exact to="/">Главная</router-link>
                <router-link active-class="active" class="nav-item nav-link" to="/category/">Категории</router-link>
              </div>
          </nav>
        </div>
    </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
