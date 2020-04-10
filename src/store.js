import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const BOOL = "BOOL";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
    bool: false,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const doneToDo = (id, bool) => {
  return {
    type: BOOL,
    id,
    bool,
  };
};

let toDos = [];
const saveToDos = () => {
  localStorage.setItem("ToDo", JSON.stringify(toDos));
};
const loadToDos = () => {
  const loadedToDos = localStorage.getItem("ToDo");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    toDos = parsedToDos;
  }
};

const reducer = (state = [], action) => {
  loadToDos();
  state = toDos;
  switch (action.type) {
    case ADD:
      toDos = [
        { text: action.text, id: Date.now(), bool: action.bool },
        ...state,
      ];
      saveToDos();
      return toDos;
    case DELETE:
      toDos = state.filter((toDo) => toDo.id !== action.id);
      saveToDos();
      return toDos;
    case BOOL:
      for (var i = 0; i < toDos.length; i++) {
        if (toDos[i].id === action.id) {
          toDos[i].bool = !action.bool;
        }
      }
      saveToDos();
      return toDos;
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
  doneToDo,
};

export default store;
