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
                <a @click="createCategory" class="nav-item btn btn-primary">Создать</a>
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
                <div class="form-group">
                  <label for="title">Название категории:</label>
                  <input class="form-control" required placeholder="Название категории" v-model="category.title" id="title">
                  <label for="description">Описание категории:</label>
                  <textarea class="form-control" required placeholder="Описание категории" v-model="category.description" id="description"></textarea>
                </div>
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
  name: 'CreateCategory',
  data () {
    return {
      category: {
        title: '',
        description: ''
      },
      validateErrors: []
    }
  },
  methods: {
    createCategory: function () {
      this.validateErrors = []
      if (!this.category.title) {
        this.validateErrors.push('Введите заголовок каегории')
      }
      if (!this.category.description) {
        this.validateErrors.push('Введите описание категории')
      }
      if (this.validateErrors.length === 0) {
        this.$http.post('http://localhost:3000/categories', this.category)
          .then(category => category.json())
          .then(category => this.$router.push('/category/' + category.id))
      }
    }
  }
}
</script>

<style scoped>

</style>
