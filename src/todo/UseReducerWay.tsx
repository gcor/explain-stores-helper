import { useReducer } from "react";

interface Todo {
  value: string;
}

type Todos = Todo[];

const defaultItems: Todos = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
];

type AddTodo = { type: "ADD_TODO"; payload: Todo };
type RemoveTodo = { type: "REMOVE_TODO"; payload: number };

type Action = AddTodo | RemoveTodo;

function todoReducer(todos: Todos, action: Action): Todos {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, action.payload];
    case "REMOVE_TODO":
      return todos.filter((t, index) => index !== action.payload);
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, defaultItems);

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

export default App;
