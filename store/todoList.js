// todoの初期値
const defaultTodoData = {
  title: '',
  details: '',
  date: '',
  time: '',
  user: -1,
  done: false,
};

export const state = () => ({
  // todoの入るリスト
  list: [
    {
      title: 'A todo',
      details: 'A details',
      date: '2022-04-15',
      time: '18:00',
      user: 0,
      done: false,
      id: 0,
      editFlag: false,
    },
    {
      title: 'B todo',
      details: 'B details',
      date: '2022-04-15',
      time: '18:00',
      user: 1,
      done: false,
      id: 1,
      editFlag: false,
    },
    {
      title: 'C todo',
      details: 'C details',
      date: '2022-04-15',
      time: '18:00',
      user: 2,
      done: false,
      id: 2,
      editFlag: false,
    },
    {
      title: 'D todo',
      details: 'D details',
      date: '2022-04-15',
      time: '18:00',
      user: 3,
      done: false,
      id: 3,
      editFlag: false,
    },
  ],
  // 最新のtodoのidと同じ値が入る。タスクの追加とかで使う場合+1して再代入
  latestId: 0,
  // 新規や編集の際にの初期値を揃えるためのobject。他のコンポーネントから編集しないようにしたい
  defaultTodo: defaultTodoData,
});

export const mutations = {
  // todoの追加
  add(state, newTodo) {
    if (newTodo.title === '') {
      alert('タイトルを入力してください');
    } else {
      // todoがない状態だと最後のtodoのidが存在しないのでプラスをしない初期値のままにする
      if (state.list.length !== 0) {
        // todoのリストで最後もののidにプラス1して数値の被らないidを作って代入
        state.latestId = state.list[state.list.length - 1].id + 1;
      }
      newTodo.id = state.latestId;
      newTodo.editFlag = false;
      // 引数で受け取った新規のtodoのidに↑で更新したidを入れる
      // todoのリストに新規のtodoを追加
      state.list.push(newTodo);
    }
  },
  // todoの削除
  remove(state, todoId) {
    // todoの数繰り返し
    for (let i = 0; i < state.list.length; i++) {
      // todoのidと引数のtodoIdが同じものを探す
      if (todoId === state.list[i].id) {
        // todoのリストから対象のtodoを削除
        state.list.splice(i, 1);
      }
    }
  },
  // todoの編集
  edit(state, todoId) {
    // todoの数繰り返し
    state.list.forEach((todo) => {
      // 全てのtodoの編集のフラグを折る
      todo.editFlag = false;
      // todoのidと引数のtodoIdが同じものを探す
      if (todo.id === todoId) {
        // 対象のtodoの編集のフラグを立てる
        todo.editFlag = true;
        console.log(todo);
      }
    });
  },
  cancel(state) {
    // todoの数繰り返し
    state.list.forEach((todo) => {
      // 全てのtodoの編集のフラグを折る
      todo.editFlag = false;
    });
  },
  // todoの更新
  update(state, { todoId, newTodoData }) {
    let targetTodo;
    for (let i = 0; i < state.list.length; i++) {
      if (state.list[i].id === todoId) {
        targetTodo = state.list[i];
      }
    }
    let title, details, date, time, user;
    // 入力されたものに更新するか既存のものを引き継ぐのか判定
    if (newTodoData.title === '') {
      title = targetTodo.title;
    } else {
      title = newTodoData.title;
    }
    if (newTodoData.details === '') {
      details = targetTodo.details;
    } else {
      details = newTodoData.details;
    }
    if (newTodoData.date === '') {
      date = targetTodo.date;
    } else {
      date = newTodoData.date;
    }
    if (newTodoData.time === '') {
      time = targetTodo.time;
    } else {
      time = newTodoData.time;
    }
    if (newTodoData.user === targetTodo.user) {
      user = targetTodo.user;
    } else {
      user = newTodoData.user;
    }
    for (let i = 0; i < state.list.length; i++) {
      if (todoId === state.list[i].id) {
        state.list[i].title = title;
        state.list[i].details = details;
        state.list[i].date = date;
        state.list[i].time = time;
        state.list[i].user = user;
        state.list[i].editFlag = false;
      }
    }
    state.list.forEach((todo) => {
      todo.editFlag = false;
    });
  },
  // 新規, 更新の際に引数に新しいtodoを受け取るためキャンセルはコンポーネント側で行う
  // cancel(state) {
  //   state.newTodo = defaultTodo;
  // },
  // todoの完了・未完了の切り替え
  toggleDone(state, todoId) {
    state.list.forEach((todo) => {
      // todoのidと引数のtodoIdが同じものを探す
      if (todo.id === todoId) {
        // todoの完了・未完了の判定・・・完了時
        if (todo.done) {
          // 未完了にする
          todo.done = false;
          // todoの完了・未完了の判定・・・未完了時
        } else {
          // 完了にする
          todo.done = true;
        }
      }
    });
    // for (let i = 0; i < state.list.length; i++) {
    //   if (todoId === state.list[i].id) {
    //     if (state.list[i].done) {
    //       state.list[i].done = false;
    //     } else {
    //       state.list[i].done = true;
    //     }
    //   }
    // }
  },
};

export const getters = {
  // idを引数にして対象のtodoを取得するgetter
  getTodoById: (state) => (id) => {
    // todoのリストから引数で受け取ったidと同じものをfind関数によって対象のtodoを返す
    return state.list.find((todo) => todo.id === id);
  },
};
