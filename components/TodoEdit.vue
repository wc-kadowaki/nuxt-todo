<template>
  <div class="todo-editor">
    <div class="todo-item__title">元のタイトル：{{ todo.title }}</div>
    <div class="todo-item__edit-item">
      <div class="todo-item__edit-name">タイトル</div>
      <input v-model="newTodo.title" type="text" />
    </div>
    <div class="todo-item__details">詳細：{{ todo.details }}</div>
    <div class="todo-item__edit-item">
      <div class="todo-item__edit-name">詳細</div>
      <textarea v-model="newTodo.details"></textarea>
    </div>
    <div class="todo-item__edit-item">
      <div class="todo-item__edit-name">期日</div>
      <input v-model="newTodo.date" type="date" />
    </div>
    <div class="todo-item__edit-item">
      <div class="todo-item__edit-name">時間</div>
      <input v-model="newTodo.time" type="time" />
    </div>
    <div class="todo-item__edit-item">
      <div class="todo-item__edit-name">担当者</div>
      <SelectUser :not="true" :value="todo.user" @active-user-select="activeUserSelect" />
    </div>
    <div class="todo-item__buttons">
      <button class="todo-item__button" @click="update(newTodo)">更新</button>
      <button class="todo-item__button" @click="cancel()">キャンセル</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // getterを使いtodoを特定するためのid
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newTodo: {
        title: '',
        details: '',
        date: '',
        time: '',
        user: -1,
        done: false,
      },
    };
  },
  computed: {
    todo() {
      // propsで受け取ったidを元にstoreからtodoを取得する
      return this.$store.getters['todoList/getTodoById'](this.$props.id);
    },
  },
  created() {
    this.newTodo.user = this.$store.state.userList.list[this.todo.user].id;
  },
  methods: {
    // 編集時に更新ボタンを押した時
    update(newTodo) {
      // console.log(newTodo);
      this.$store.commit('todoList/update', { todoId: this.$props.id, newTodoData: newTodo });
      this.$forceUpdate();
      this.$emit('test', false);
    },
    // 編集時にキャンセルボタンを押した時
    cancel() {
      this.$store.commit('todoList/cancel');
      this.$forceUpdate();
    },
    activeUserSelect(user) {
      let userData;
      for (let i = 0; i < this.$store.state.userList.list.length; i++) {
        if (user === this.$store.state.userList.list[i].name) {
          userData = this.$store.state.userList.list[i].id;
        }
      }
      this.newTodo.user = userData;
    },
  },
};
</script>