import { useState } from "react";

interface Todo {
  value: string;
}

type Todos = Todo[];

export const initialState: Todos = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
];

const useTodos = (defaultValue: Todos) => {
  const [todos, setTodos] = useState<Todos>(defaultValue);

  function addTodo(value: string) {
    setTodos([...todos, { value: value }]);
  }

  function removeTodo(i: number) {
    setTodos(todos.filter((t, index) => index !== i));
  }

  return {
    todos,
    addTodo,
    removeTodo,
  };
};

export function HooksWay({ defaultState = initialState }) {
  const { todos, addTodo, removeTodo } = useTodos(defaultState);

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
