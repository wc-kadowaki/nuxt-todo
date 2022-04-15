<template>
  <div class="todo-list">
    <h2 class="todo-list__title">{{ activeUserName }}のtodo</h2>
		<!-- <TodoItem :id="0" /> -->
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    activeUserName: {
      type: String,
      required: true,
      default: 'all',
    },
  },
  computed: {
    userList() {
      return this.store.state.userList.list;
    },
  },
};
</script>