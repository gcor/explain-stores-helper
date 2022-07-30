import { useReducer } from "react";

interface Todo {
  value: string;
}

export type Todos = Todo[];

export const initialState: Todos = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
];

export type AddTodo = { type: "ADD_TODO"; payload: Todo };
export type RemoveTodo = { type: "REMOVE_TODO"; payload: number };

type Action = AddTodo | RemoveTodo;

export function todoReducer(todos: Todos, action: Action): Todos {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, action.payload];
    case "REMOVE_TODO":
      return todos.filter((t, index) => index !== action.payload);
    default:
      return todos;
  }
}

export function UseReducerWay({ defaultState = initialState }) {
  const [todos, dispatch] = useReducer(todoReducer, defaultState);

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch({ type: "ADD_TODO", payload: { value: e.target.value } });
      e.target.value = "";
    }
  }

  function onItemClick(i: number) {
    dispatch({ type: "REMOVE_TODO", payload: i });
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
