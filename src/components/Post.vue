<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="nav">
          <router-link class="nav-item btn btn-secondary" :to="{path: `/category/${post.categoryId}`}">Назад</router-link>
        </div>
        <br>
        <div class="card">
          <div class="card-body">
            <h2>{{post.title}}</h2>
            <hr>
            <p>{{post.body}}</p>
          </div>
        </div>
        <div id="comments" v-if="this.post.comments.length > 0" class="card" style="margin-top: 15px" >
          <div class="card-body">
            <h4 class="text-secondary">Комментарии</h4>
            <div v-for="(comment, key) in post.comments" :key="key" class="form-group">
              <div style="margin-bottom: 5px" class="text-secondary row">
                <div class="col">
                <a>Автор: </a><a class="font-weight-bold text-info">{{comment.username}}</a>
                </div>
                <div class="col text-right ">
                <a class="text-danger" @click="deleteComment(comment.id)">Удалить</a>
                </div>
              </div>
              <p>{{comment.body}}</p>
              <hr>
            </div>
          </div>
        </div>
        <div style="margin-top: 15px" class="card">
          <div class="card-body">
            <form action="#comments">
              <div class="form-row">
                <div class="col form-group">
                  <label for="username">Никнейм</label>
                  <input required class="form-control" id="username" v-model.lazy="newComment.username">
                </div>
              </div>
              <div class="form-row">
                <div class="col form-group">
                  <label for="body">Комментарий</label>
                  <textarea required class="form-control" id="body" v-model.lazy="newComment.body"></textarea>
                </div>
              </div>
              <button class="btn btn-primary" type="submit" @click="sendComment">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      id: this.$route.params.id,
      post: {
        comments: []
      },
      newComment: {
        username: '',
        body: '',
        postId: ''
      },
      val: ''
    }
  },
  methods: {
    sendComment: function () {
      if (this.newComment.username && this.newComment.body) {
        this.$http.post('http://localhost:3000/comments', {...this.newComment})
          .then(result => this.post.comments.push(result.body))
          .then(() => {
            for (let i in this.newComment) {
              this.newComment[i] = ''
            }
            this.newComment.postId = this.id * 1
          })
          .catch(error => console.log(error))
      }
    },
    deleteComment: function (id) {
      this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить комментарий?').then(result => {
        if (result) {
          this.$http.delete('http://localhost:3000/comments/' + id)
            .then(() => {
              this.$http.get('http://localhost:3000/comments/' + '?postId=' + this.id)
                .then(result => result.json())
                .then(result => {
                  this.post.comments = result
                })
            })
            .then(() => {
              for (let i in this.newComment) {
                this.newComment[i] = ''
              }
              this.newComment.postId = this.id * 1
            })
            .catch(error => console.log(error))
        }
      })
    }
  },
  beforeMount () {
    this.$http.get('http://localhost:3000/posts/' + this.id + '?_embed=comments')
      .then(result => result.json())
      .then(result => {
        this.post = result
      })
    this.newComment.postId = this.id * 1
  }
}
</script>

<style scoped>

</style>
