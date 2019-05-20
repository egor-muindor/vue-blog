<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
          <div class="container">
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto">
                <a class="nav-item btn btn-secondary" @click="$router.back()">Назад</a>
              </ul>
              <ul class="navbar-nav ml-auto">
                <a @click="createPost" class="nav-item btn btn-primary">Опубликовать</a>
              </ul>
            </div>
          </div>
        </nav>
        <div class="card">
          <div class="card-body">
            <form action="#" id="main-form">
              <div class="form-group">
                <ul>
                  <li v-for="(error, key) in validateErrors" :key="key">{{error}}</li>
                </ul>
                <div class="form-row">
                  <div class="form-group col-9">
                    <label for="title">Название статьи:</label>
                    <input class="form-control" required placeholder="Название статьи" v-model="post.title" id="title">
                  </div>
                  <div class="form-group col">
                    <label for="author">Автор:</label>
                    <input class="form-control" required placeholder="Имя автора" v-model="post.author" id="author">
                  </div>
                </div>
                <label for="category">Категория статьи:</label>
                <select id="category" v-model="post.categoryId" class="form-control">
                  <option :value="-1" disabled>Выберете категорию статьи</option>
                  <option :value="category.id" v-for="(category, key) in categories" :key="key">{{category.title}}</option>
                </select>
                <label for="body">Статья:</label>
                <textarea class="form-control" required placeholder="Название статьи" v-model="post.body" id="body"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePost',
  data () {
    return {
      post: {
        title: '',
        body: '',
        author: '',
        categoryId: -1
      },
      validateErrors: [],
      categories: []
    }
  },
  methods: {
    createPost: function () {
      this.validateErrors = []
      if (!this.post.title) {
        this.validateErrors.push('Введите заголовок поста')
      }
      if (!this.post.body) {
        this.validateErrors.push('Введите текст поста')
      }
      if (!this.post.author) {
        this.validateErrors.push('Введите автора')
      }
      if (this.post.categoryId === -1) {
        this.validateErrors.push('Выбете категорию')
      }
      if (this.validateErrors.length === 0) {
        this.$http.post('http://localhost:3000/posts', this.post)
          .then(post => post.json())
          .then(post => this.$router.push('/post/' + post.id))
      }
    }
  },
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
