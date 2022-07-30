import { fireEvent, screen, render } from "@testing-library/react";
import { HooksWay, initialState } from "../HooksWay";

const initialTodos = initialState.map((item) => item.value);

test("should add todo", () => {
  const newTodo = "supernew todo";

  render(<HooksWay defaultState={initialState} />);

  const input = screen.getByPlaceholderText("Add todo");

  expect(screen.queryByText(newTodo)).not.toBeInTheDocument();

  fireEvent.keyUp(input, { key: "Space", target: { value: newTodo } });

  expect(screen.queryByText(newTodo)).not.toBeInTheDocument();

  fireEvent.keyUp(input, { key: "Enter", target: { value: newTodo } });

  expect(screen.getByText(newTodo)).toBeInTheDocument();
});

test("should remove todo", () => {
  const { container } = render(<HooksWay />);

  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  const items = Array.from(container.querySelectorAll("li")).map(
    (item) => item.textContent
  );

  expect(items).toEqual(["one", "two", "three"]);

  const removeTodoValue = initialTodos[0];
  const firstTodo = screen.getByText(removeTodoValue);

  fireEvent.click(firstTodo);

  expect(screen.queryByText(removeTodoValue)).not.toBeInTheDocument();
});
