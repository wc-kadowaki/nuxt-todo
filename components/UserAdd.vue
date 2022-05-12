<template>
  <div class="user-add">
    <input v-model="user.name" type="text" placeholder="追加したい名前" />
    <button type="button" @click="add()">追加</button>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  data() {
    return {
      user: {
        name: '',
      },
    };
  },
  methods: {
    add() {
      this.$store.commit('userList/add', this.user);
    },
  },
};
</script>
