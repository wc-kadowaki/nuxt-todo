<template>
  <div class="todo-item">
    <div>{{ todo.title }}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      todo: this.methods.getTodoData(this.$props.id),
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getTodoData(id) {
      this.store.commit('todoList/getTodoData', id);
    },
    ...mapMutations({
      getTodoData: 'todoList/getTodoData',
    }),
  },
};
</script>