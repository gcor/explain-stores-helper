import { fireEvent, render, screen } from "@testing-library/react";
import App, { Way } from "../../App";
import { initialState } from "../ReduxWay";

const initialTodos = initialState.map((item) => item.value);

test("add and remove scenario in each way", () => {
  const newTodo = "supernew todo";

  const { container } = render(<App />);

  const select = screen.getByTestId("select-way") as HTMLSelectElement;

  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  const getItems = () => container.querySelectorAll("li");
  const getTodos = () => Array.from(getItems()).map((item) => item.textContent);

  Object.keys(Way).forEach((way) => {
    // should select way
    fireEvent.change(select, { target: { value: way } });
    expect(select.value).toEqual(way);

    const input = screen.getByPlaceholderText("Add todo");

    // should not add new todo by Space click
    fireEvent.keyUp(input, { key: "Space", target: { value: newTodo } });
    expect(screen.queryByText(newTodo)).not.toBeInTheDocument();

    // shoud add new todo by Enter click
    fireEvent.keyUp(input, { key: "Enter", target: { value: newTodo } });
    expect(screen.getByText(newTodo)).toBeInTheDocument();
    expect(getTodos()).toEqual([...initialTodos, newTodo]);

    // should remove todo item
    const items = getItems();
    fireEvent.click(items[items.length - 1]);

    // should check last state
    expect(getTodos()).toEqual(initialTodos);
  });
});
