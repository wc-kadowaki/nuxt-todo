const initUser = [
  {
    name: 'mike',
    id: 0,
    editFlag: false,
  },
  {
    name: 'john',
    id: 1,
    editFlag: false,
  },
  {
    name: 'leon',
    id: 2,
    editFlag: false,
  },
  {
    name: 'bob',
    id: 3,
    editFlag: false,
  },
];

// state
export const state = () => ({
  list: initUser,
  latestId: 0,
  notUser: '選択しない',
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
  edit(state, userId) {
    state.list.forEach((user) => {
      // 全てのuserの編集のフラグを折る
      user.editFlag = false;
      // userのidと引数のuserIdが同じものを探す
      if (user.id === userId) {
        // 対象のuserの編集のフラグを立てる
        user.editFlag = true;
      }
    });
  },
  // ユーザー情報の変更
  update(state, { userId, newUserData }) {
    for (let i = 0; i < state.list.length; i++) {
      if (userId === state.list[i].id) {
        state.list[i].name = newUserData.name;
        state.list[i].editFlag = false;
      }
    }
  },
};
