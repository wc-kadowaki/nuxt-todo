<template>
  <div :key="hoge" class="todo-item">
    <!-- {{ todo }} -->
    <div v-if="!todo.editFlag" class="todo-item__default">
      <div class="todo-item__title">{{ todo.title }}</div>
      <div v-if="todo.details !== ''" class="todo-item__details">詳細：{{ todo.details }}</div>
      <div v-if="todo.date !== ''" class="todo-item__datetime">期日：{{ todo.date }}</div>
      <div v-if="todo.time !== ''" class="todo-item__datetime">時間：{{ todo.time }}</div>
      <div v-if="todo.user >= 0" class="todo-item__user">担当者：{{ user[todo.user].name }}</div>
      <div class="todo-item__buttons">
        <button class="todo-item__button" @click="edit(todo.id)">編集</button>
        <button class="todo-item__button" @click="toggleDone(todo.id)"><span v-if="todo.done">未完了</span><span v-else>完了</span></button>
        <button class="todo-item__button" @click="remove()">削除</button>
      </div>
    </div>
    <div v-else class="todo-item__edit">
      <TodoEdit :id="todo.id" @test="testFn" />
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
      hoge: false,
    };
  },
  computed: {
    todo() {
      // propsで受け取ったidを元にstoreからtodoを取得するgetter
      return this.$store.getters['todoList/getTodoById'](this.$props.id);
    },
    user() {
      return this.$store.state.userList.list;
    },
    todoList() {
      return this.$store.state.todoList.list;
    },
  },
  methods: {
    // 編集ボタンを押した時
    edit(id) {
      // todoListのmutationsのeditを呼び出す
      this.$store.commit('todoList/edit', id);
      this.$forceUpdate();
    },
    // 完了・未完了のボタンを押した時
    toggleDone(id) {
      // todoListのmutationsのtoggleDoneを呼び出す
      this.$store.commit('todoList/toggleDone', id);
      this.$forceUpdate();
      this.$emit('test', false);
    },
    remove() {
      this.$store.commit('todoList/remove', this.$props.id);
    },
    testFn() {
      this.$forceUpdate();
    },
  },
};
</script>