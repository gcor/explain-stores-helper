import { useState } from "react";

interface Todo {
  value: string;
}

type Todos = Todo[];

const initialState: Todos = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
];

function App() {
  const [todos, setTodos] = useState<Todos>(initialState);

  function addTodo(value: string) {
    setTodos([...todos, { value: value }]);
  }

  function removeTodo(i: number) {
    setTodos(todos.filter((t, index) => index !== i));
  }

  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTodo(e.target.value);
      e.target.value = "";
    }
  }

  return (
    <div>
      <input onKeyUp={onKeyUp} placeholder="Add todo" />
      <ul>
        {todos.map((todo, i) => (
          <li key={i} onClick={() => removeTodo(i)}>
            {todo.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
