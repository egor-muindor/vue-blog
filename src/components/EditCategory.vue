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
                <a @click="deleteCategory" class="nav-item btn btn-danger">Удалить</a>
                <a @click="updateCategory" class="nav-item btn btn-primary">Сохранить</a>
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
  name: 'EditCategory',
  data () {
    return {
      id: this.$route.params.id,
      category: {},
      validateErrors: []
    }
  },
  methods: {
    updateCategory: function () {
      this.validateErrors = []
      if (!this.category.title) {
        this.validateErrors.push('Введите заголовок каегории')
      }
      if (!this.category.description) {
        this.validateErrors.push('Введите описание категории')
      }
      if (this.validateErrors.length === 0) {
        this.$http.put('http://localhost:3000/categories/' + this.id, this.category)
          .then(category => category.json())
          .then(category => this.$router.push('/category/' + category.id))
      }
    },
    deleteCategory: function () {
      this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить категорию и все её посты?').then(result => {
        if (result) {
          this.$http.delete('http://localhost:3000/categories/' + this.id)
            .then(() => {
              this.$router.push('/category/')
            })
            .catch(error => console.log(error))
        }
      })
    }
  },
  beforeMount () {
    this.$http.get('http://localhost:3000/categories/' + this.id)
      .then(result => result.json())
      .then(result => {
        this.category = result
      })
  }
}
</script>

<style scoped>

</style>
