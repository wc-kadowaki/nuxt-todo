export const state = () => ({
  list: [
    {
      title: 'A todo',
      details: 'A details',
      date: '20220415',
      time: '18:00',
      user: 'mike',
      done: false,
      id: 0,
    },
    {
      title: 'B todo',
      details: 'B details',
      date: '20220415',
      time: '18:00',
      user: 'john',
      done: false,
      id: 1,
    },
    {
      title: 'C todo',
      details: 'C details',
      date: '20220415',
      time: '18:00',
      user: 'leon',
      done: false,
      id: 2,
    },
    {
      title: 'D todo',
      details: 'D details',
      date: '20220415',
      time: '18:00',
      user: 'bob',
      done: false,
      id: 3,
    },
  ],
  latestId: 0,
});

export const mutations = {
  add(state, newTodo) {
    state.latestId = state.list[state.list.length - 1].id + 1;
    newTodo.id = state.latestId;
    state.list.push(newTodo);
  },
  remove(state, todoId) {
    for (let i = 0; i < state.list.length; i++) {
      if (todoId === state.list[i].id) {
        state.list.splice(i, 1);
      }
    }
  },
  update(state, todoId, newTodoData) {
    for (let i = 0; i < state.list.length; i++) {
      if (todoId === state.list[i].id) {
        state.list[i] = newTodoData;
      }
    }
  },
  getTodoData(state, todoId) {
    for (let i = 0; i < state.list.length; i++) {
      if (todoId === state.list[i].id) {
        return state.list[i];
      }
    }
  },
};
