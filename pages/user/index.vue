<template>
  <div class="user-list">
    <Header />
    <PageTitle :title="title" />
    <UserAdd />
    <div v-for="(user, key) in userList" :key="key">
      <div v-if="user.editFlag">
        <input v-model="newUser.name" type="text" />
        <button type="button" @click="update(user.id)">更新</button>
      </div>
      <div v-else>
        <NuxtLink :to="`/user/${user.name}`">{{ user.name }}</NuxtLink>
        <button type="button" @click="edit(user.id)">変更</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      title: 'ユーザー一覧',
      newUser: {
        name: '',
      },
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList.list;
    },
  },
  methods: {
    edit(id) {
      this.$store.commit('userList/edit', id);
    },
    update(id) {
      this.$store.commit('userList/update', { userId: id, newUserData: this.newUser });
    },
  },
};
</script>