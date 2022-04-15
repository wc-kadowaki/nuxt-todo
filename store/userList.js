// state
export const state = () => ({
  list: [
    { name: 'mike', id: 0 },
    { name: 'john', id: 1 },
    { name: 'leon', id: 2 },
    { name: 'bob', id: 3 },
  ],
  latestId: 0,
});

// mutations
export const mutations = {
  // ユーザー追加
  add(state, newUser) {
    state.latestId = state.list[state.list.length - 1].id + 1;
    newUser.id = state.latestId;
    state.list.push(newUser);
  },
  // ユーザー削除
  remove(state, userId) {
    for (let i = 0; i < state.list.length; i++) {
      if (userId === state.list[i].id) {
        state.list.splice(i, 1);
      }
    }
  },
  // ユーザー情報の変更
  update(state, userId, newUserData) {
    for (let i = 0; i < state.list.length; i++) {
      if (userId === state.list[i].id) {
        state.list[i] = newUserData;
      }
    }
  },
};
