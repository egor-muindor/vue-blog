<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
          <div class="container">
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto">
                <a class="nav-item btn btn-secondary" @click="$router.push('/category/' + post.categoryId)">Назад</a>
              </ul>
              <ul class="navbar-nav ml-auto">

              </ul>
            </div>
          </div>
        </nav>
        <div class="card">
          <div class="card-body">
            <div class="row">
            <div class="col">
              <h2>{{post.title}}</h2>
            </div>
              <div class="col text-right">
                <a class="btn btn-sm btn-outline-primary" @click="$router.push('/post/' + id +'/edit')">Редактировать</a>
              </div>
            </div>
            <a class="text-secondary">Автор: </a><a class="text-info">{{post.author}}</a>
            <hr>
            <p>{{post.body}}</p>
          </div>
        </div>
        <div id="comments" v-if="this.post.comments.length > 0" class="card" style="margin-top: 15px">
          <div class="card-body">
            <h4 class="text-secondary">Комментарии</h4>
            <div v-for="(comment, key) in post.comments" :key="key" class="form-group">
              <div style="margin-bottom: 5px" class="text-secondary row">
                <div class="col">
                  <a>Автор: </a><a class="font-weight-bold text-info">{{comment.username}}</a>
                </div>
                <div class="col text-right ">
                  <a class="btn mr-1 btn-sm btn-outline-primary" @click="editComment(comment.id)">Редактировать</a>
                  <a class="btn btn-sm btn-outline-danger" @click="deleteComment(comment.id)">Удалить</a>
                </div>
              </div>
              <p>{{comment.body}}</p>
              <hr>
            </div>
          </div>
        </div>
        <div style="margin-top: 15px" class="card">
          <div class="card-body">
            <form @submit="sendComment" action="javascript:void(0);">
              <div class="form-row">
                <div class="col form-group">
                  <label for="username">Никнейм</label>
                  <input placeholder="Ваш никнейм" required class="form-control" id="username" v-model.lazy="newComment.username">
                </div>
              </div>
              <div class="form-row">
                <div class="col form-group">
                  <label for="body">Комментарий</label>
                  <textarea placeholder="Ваш комментарий" required class="form-control" id="body" v-model.lazy="newComment.body"></textarea>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-modal @cancel="updateComment('cancel')" @ok="updateComment('ok')" ref="edit-modal" id="edit-modal" title="Редактирования">
        <div class="form-group">
          <a>Автор комментария: </a><a class="font-weight-bold text-info">{{editingComment.username}}</a><br>
          <label class="col-form-label" for="">Комментарий</label>
          <textarea placeholder="Ваш комментарий" class="form-control" v-model="editingComment.body"></textarea>
        </div>
        <template slot="modal-footer" slot-scope="{ cancel, ok }" class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-left"
            @click="cancel()"
          >Отменить
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="ok()"
          >Сохранить
          </b-button>
        </template>
      </b-modal>
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
      editingId: 0,
      editingComment: {},
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
      this.$http.post('http://localhost:3000/comments', {...this.newComment})
        .then(result => this.post.comments.push(result.body))
        .then(() => {
          for (let i in this.newComment) {
            this.newComment[i] = ''
          }
          this.newComment.postId = this.id * 1
        })
        .catch(error => console.log(error))
    },
    editComment: function (id) {
      this.editingId = id
      this.$http.get('http://localhost:3000/comments/' + this.editingId)
        .then(result => result.json())
        .then(result => {
          this.editingComment = result
        })
      this.$bvModal.show('edit-modal')
    },
    updateComment: function (status) {
      if (status === 'ok') {
        if (this.editingComment.body !== '') {
          this.$http.put('http://localhost:3000/comments/' + this.editingId, this.editingComment)
            .then(() => {
              this.$http.get('http://localhost:3000/comments/' + '?postId=' + this.id)
                .then(result => result.json())
                .then(result => {
                  this.post.comments = result
                })
            })
            .catch(error => console.log(error))
        }
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
