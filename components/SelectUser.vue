<template>
  <div class="select-user">
    <div class="select-user__list">
      <select v-model="selectValue" @change="activeUserSelect">
        <!-- valueにユーザーのnameも受け取ることがあるので表現や仕様について工夫が必要(優先度:低) -->
        <option v-if="other" disabled>{{ value }}</option>
        <option v-if="not" :value="-1">{{ notUser }}</option>
        <option v-for="(user, key) in userList" :key="key" :value="user.id" :selected="user.id === selectValue">{{ user.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectUser',
  props: {
    all: {
      // allの選択肢を持つかどうか(選択肢のテキストはcomputedのallUser)
      type: Boolean,
      required: false,
      default: false,
    },
    not: {
      // 選択しないの選択肢を持つかどうか(選択肢のテキストはcomputedのnotUser)
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      // 現在選択中の値を受け取る
      type: Number,
      required: true,
    },
    other: {
      // その他の値を受け取るかどうか
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      // selectのvalueにpropsで受け取ったものを代入
      selectValue: this.$store.state.userList.list[this.$props.value].id,
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList.list;
    },
    allUser() {
      return this.$store.state.userList.allUser;
    },
    notUser() {
      return this.$store.state.userList.notUser;
    },
  },
  methods: {
    activeUserSelect(e) {
      // selectにん変更があった際にemitで親コンポーネントに選択した値を送る
      this.$emit('active-user-select', e.target.value);
    },
  },
};
</script>