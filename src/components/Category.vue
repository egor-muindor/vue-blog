<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
          <div class="container">
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto">
                <a class="nav-item btn btn-secondary" @click="$router.push('/category/')">Назад</a>
              </ul>
              <ul class="navbar-nav ml-auto">
                <router-link class="nav-item btn btn-primary" :to="{path: '/post/create'}">Создать новый пост</router-link>
              </ul>
            </div>
          </div>
        </nav>
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="col">
                <h2>
                  <h3>{{category.title}}</h3>
                </h2>
              </div>
              <div class="col text-right">
                <a class="btn btn-outline-primary" @click="$router.push('/category/' + id + '/edit')">Редактировать категорию</a>
              </div>
            </div>
            <a class="btn btn-sm btn-outline-info" type="button"
               @click="showDescription=!showDescription">
              Подробнее о категории</a>
            <div v-show="showDescription">
              {{category.description}}
            </div>
            <hr>
            <div>
              <div v-if="category.posts.length === 0">
                <h3>В данной категории ещё нет постов.</h3>
              </div>
              <div v-for="(post, key) in category.posts" :key="key">
                <router-link :to="'/post/' + post.id"><h4>{{post.title}}</h4></router-link>
                <p>{{post.body | sliceDescription}}</p>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      id: this.$route.params.id,
      category: {},
      showDescription: false
    }
  },
  methods: {},
  filters: {
    sliceDescription (str) {
      return (str.length > 200) ? str.slice(0, 200) + '...' : str
    }
  },
  beforeMount () {
    this.$http.get('http://localhost:3000/categories/' + this.id + '?_embed=posts')
      .then(result => result.json())
      .then(result => {
        this.category = result
      })
  }
}
</script>

<style scoped>

</style>
