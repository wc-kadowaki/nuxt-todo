<template>
  <div class="select-user">
    <div class="select-user__list">
      <div v-for="(user, key) in userList" :key="key" class="select-user__item">
        <button type="button" class="select-user__button" @click="activeUserSelect(user.name)">
          {{ user.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectUser',
  computed: {
    userList() {
      return this.$store.state.userList.list;
    },
  },
  methods: {
    activeUserSelect(userName) {
      this.$emit('active-user-select', userName);
    },
  },
};
</script>