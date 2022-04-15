<template>
  <div>
    <PageTitle :title="title" />
    <SelectUser @active-user-select="activeUserSelect" />
    <TodoList :active-user-name="activeUserName" />
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      title: 'ユーザーページ',
      activeUserName: 'all',
    };
  },
  computed: {
    userList() {
      return this.store.state.userList;
    },
  },
  methods: {
    activeUserSelect(userName) {
      this.$data.activeUserName = userName;
      console.log(this.$data.activeUserName);
    },
  },
	created() {
		console.log(this.$store)
	}
};
</script>