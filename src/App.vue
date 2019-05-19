<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-collapse">
        <div class="navbar-nav">
          <router-link active-class="active" class="nav-item nav-link" exact to="/">Главная</router-link>
          <router-link active-class="active" class="nav-item nav-link" to="/category/">Категории</router-link>
        </div>
      </div>
    </nav>
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
