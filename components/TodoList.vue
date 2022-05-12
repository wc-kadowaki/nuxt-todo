<template>
  <!--
    todoリストを表示するためのコンポーネント
    ユーザーごとに表示と全てのユーザーで表示できるようにしたい
   -->
  <div :key="hoge" class="todo-list">
    <!-- propsで受け取ったユーザーのtodoを表示するようにしたいのでタイトルもそれに応じて表示を変化させる -->
    <h2 class="todo-list__title">{{ activeUserName }}のtodo</h2>
    <div v-if="notDoneTodoList.length === 0">todoはありません</div>
    <div v-else>
      <!-- TodoItemコンポーネントはidを渡すことでそのidのtodoを表示できるためidのみを受け渡している -->
      <TodoItem v-for="todo in notDoneList" :id="todo.id" :key="todo.id" @test="testFn" />
    </div>
    <div>
      <div v-if="doneTodoList.length === 0">完了したtodoはありません</div>
      <div v-else>
        <button :class="open ? 'open' : 'close'" class="button" @click="toggleButton()">完了したtodoを表示する</button>
        <div v-if="open">
          <h3>完了したtodo</h3>
          <TodoItem v-for="todo in doneList" :id="todo.id" :key="todo.id" @test="testFn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    // 対象者の名前(idを受け取る形にして同名の場合の対策をできるのでは？)
    activeUserName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      hoge: false,
      doneList: [],
      notDoneList: [],
    };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList.list;
    },
  },
  watch: {
    todoList: {
      handler() {
        this.hoge = !this.hoge;
      },
      deep: true,
    },
  },
  created() {
    this.notDoneTodoList();
    this.doneTodoList();
  },
  methods: {
    toggleButton() {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    testFn() {
      this.$forceUpdate();
      // console.log(this.todoList);
    },
    notDoneTodoList() {
      if (this.$props.activeUserName === this.$store.state.allUser) {
        this.notDoneList = this.$store.state.todoList.list.filter((todo) => todo.done === false);
      } else {
        const name = this.$props.activeUserName;
        const list = this.$store.state.userList.list;
        this.notDoneList = this.$store.state.todoList.list
          .filter((todo) => todo.done === false)
          .filter(function (todo) {
            if (todo.user >= 0) {
              return list[todo.user].name === name;
            } else {
              return false;
            }
          });
      }
      console.log(this.notDoneList);
    },
    doneTodoList() {
      if (this.$props.activeUserName === this.$store.state.allUser) {
        this.doneList = this.$store.state.todoList.list.filter((todo) => todo.done === true);
      } else {
        const name = this.$props.activeUserName;
        const list = this.$store.state.userList.list;
        this.doneList = this.$store.state.todoList.list
          .filter((todo) => todo.done === true)
          .filter(function (todo) {
            if (todo.user >= 0) {
              return list[todo.user].name === name;
            } else {
              return false;
            }
          });
      }
      // console.log(this.doneList);
    },
  },
};
</script>