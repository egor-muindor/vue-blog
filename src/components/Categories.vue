<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="col">
                <h2>
                  Список категорий
                </h2>
              </div>
              <div class="col text-right">
                <a class="btn btn-outline-primary" @click="$router.push('/category/create')">Создать новую категорию</a>
              </div>
            </div>
            <hr>
            <router-link v-for="(category, key) in categories" :key="key"
               :to="{path: '/category/' + category.id}">
              {{++key}}. {{category.title}}<br></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Categories',
  data () {
    return {
      'categories': []
    }
  },
  methods: {},
  beforeCreate () {
    this.$http.get('http://localhost:3000/categories')
      .then(result => result.json())
      .then(result => {
        this.categories = result
      })
  }
}
</script>

<style scoped>

</style>
