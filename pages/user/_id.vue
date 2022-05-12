<template>
  <div>
    <Header />
    <PageTitle :title="title" />
    <button :class="addTodo ? 'close' : 'open'" class="button" @click="toggleButton()">todoを追加する</button>
    <TodoAdd v-if="addTodo" :user="$route.params.id" @edit-judge="editJudge" />
    <!-- valueは現在選択されているユーザーを子コンポーネントにpropsで送る -->
    <TodoList :value="$route.params.id" :active-user-name="activeUserName" />
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      title: this.$route.params.id,
      addTodo: false,
      activeUserName: this.$route.params.id,
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList.list;
    },
  },
  methods: {
    // 子コンポーネントから値を受け取りdataを変更する関数
    activeUserSelect(userName) {
      this.$data.activeUserName = userName;
      this.userVisible = true;
    },
    toggleButton() {
      if (this.addTodo) {
        this.addTodo = false;
      } else {
        this.addTodo = true;
      }
    },
    editJudge(e) {
      this.addTodo = e;
    },
  },
  transitions: 'user',
};
</script>
<style lang="scss" scoped>
.button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  padding: 5px 25px 5px 5px;
  position: relative;
  font-size: 16px;

  &::before {
    content: '';
    width: 20px;
    height: 2px;
    background-color: #000000;
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: #000000;
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(90deg);
    transition: transform 0.25s ease-out;
  }

  &.close {
    &::after {
      transform: translateY(-50%) rotate(0deg);
    }
  }
}
</style>