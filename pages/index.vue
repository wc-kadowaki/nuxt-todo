<template>
  <div>
    <Header />
    <PageTitle :title="title" />
    <div v-if="notDoneTodoList.length === 0">todoはありません</div>
    <div v-else>
      <TodoItem v-for="(todo, key) in notDoneTodoList" :id="todo.id" :key="key" />
    </div>
    <div v-if="doneTodoList.length === 0">完了したtodoはありません</div>
    <div v-else>
      <button :class="open ? 'open' : 'close'" class="button" @click="toggleButton()">完了したtodoを表示する</button>
      <div v-if="open">
        <h3>完了したtodo</h3>
        <TodoItem v-for="(todo, key) in doneTodoList" :id="todo.id" :key="key" />
      </div>
    </div>
  </div>
</template>

<script>
const openButtonText = '完了したtodoを表示する';
const closeButtonText = '閉じる';

export default {
  name: 'IndexPage',
  data() {
    return {
      title: 'todo一覧',
      buttonText: openButtonText,
      open: false,
    };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList.list;
    },
    doneTodoList() {
      const data = this.$store.state.todoList.list.filter((todo) => todo.done === true);
      return data;
    },
    notDoneTodoList() {
      const data = this.$store.state.todoList.list.filter((todo) => todo.done === false);
      return data;
    },
  },
  methods: {
    toggleButton() {
      if (this.open) {
        this.open = false;
        this.buttonText = openButtonText;
      } else {
        this.open = true;
        this.buttonText = closeButtonText;
      }
    },
  },
};
</script>
