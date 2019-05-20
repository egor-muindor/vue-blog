<template>
  <div class="py-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h2> Реализация категорий </h2>
            <p>Для примера была взята простая структура блога. Она представляет собой:</p>
            <a>Категория блога => Статья => Комментарии</a>
            <p>Для работы с информацией в БД представлены следующие возможности:</p>
            <ul>
              <li>Редактирование списка категорий</li>
              <ul class="text-success">
                - Отображение списка категорий
              </ul>
              <ul>
                - Добавление новой категории
              </ul>
              <ul>
                - Редактирование существующей категории
              </ul>
              <ul>
                - Удаление существующей категории
              </ul>
              <li class="text-success">Редактирование статей (Готово)</li>
              <ul class="text-success">
                - Отображение статей в категории
              </ul>
              <ul class="text-success">
                - Добавление новой статьи
              </ul>
              <ul class="text-success">
                - Редактирование существующей статьи
              </ul>
              <ul class="text-success">
                - Удаление существующей статьи
              </ul>
              <li class="text-success">Редактирование комментариев (Готово)</li>
              <ul class="text-success">
                - Отображение комментариев в статье
              </ul>
              <ul class="text-success">
                - Добавление нового комментария
              </ul>
              <ul class="text-success">
                - Редактирование существующего комментария
              </ul>
              <ul class="text-success">
                - Удаление существующего комментария
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped>

</style>
