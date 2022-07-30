import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

interface Todo {
  value: string;
}

type Todos = Todo[];

export const initialState: Todos = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (todos, action: PayloadAction<Todo>) => [...todos, action.payload],
    removeTodo: (todos, action) =>
      todos.filter((t, index) => index !== action.payload),
  },
});

const { addTodo, removeTodo } = todoSlice.actions;

export const store = configureStore({
  reducer: todoSlice.reducer,
});

type RootState = ReturnType<typeof store.getState>;

export function App() {
  const todos = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch(addTodo({ value: e.target.value }));
      e.target.value = "";
    }
  }

  function onItemClick(i: number) {
    dispatch(removeTodo(i));
  }

  return (
    <div>
      <input onKeyUp={onKeyUp} placeholder="Add todo" />
      <ul>
        {todos.map((todo, i) => (
          <li key={i} onClick={() => onItemClick(i)}>
            {todo.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReduxWay() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
