<template>
  <div class="todo-add">
    <div class="todo-add__item">
      <div class="todo-add__name">タイトル</div>
      <input v-model="todo.title" type="text" />
    </div>
    <div class="todo-add__item">
      <div class="todo-add__name">詳細</div>
      <textarea v-model="todo.details" class="editor__textarea"></textarea>
    </div>
    <div class="todo-add__item">
      <div class="todo-add__name">期日</div>
      <input v-model="todo.date" type="date" />
    </div>
    <div class="todo-add__item">
      <div class="todo-add__name">時間</div>
      <input v-model="todo.time" type="time" />
    </div>
    <div class="todo-add__item">
      <div class="todo-add__name">担当者</div>
      <SelectUser :not="true" :value="todo.user" @active-user-select="activeUserSelect" />
    </div>
    <button class="todo-item__button" @click="add()">追加</button>
  </div>
</template>

<script>
export default {
  name: 'TodoAdd',
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      todo: {},
    };
  },
  created() {
    this.reset();
  },
  methods: {
    add() {
      this.$store.commit('todoList/add', this.todo);
      // todoを追加した後入力したものをリセットしたいが↓でリセットかけようとすると↑のコミットも入力されていないことになる、、
      this.editJudge();
    },
    activeUserSelect(user) {
      this.todo.user = user;
    },
    editJudge() {
      this.$emit('edit-judge', false);
    },
    reset() {
      Object.assign(this.todo, this.$store.state.todoList.defaultTodo);
      let userData;
      for (let i = 0; i < this.$store.state.userList.list.length; i++) {
        if (this.$props.user === this.$store.state.userList.list[i].name) {
          userData = this.$store.state.userList.list[i].id;
        }
      }
      this.todo.user = userData;
    },
  },
};
</script>