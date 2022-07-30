import { todoReducer, RemoveTodo } from "../UseReducerWay";

test("should check add_todo action", () => {
  expect(
    todoReducer([], {
      type: "ADD_TODO",
      payload: { value: "new todo" },
    })
  ).toEqual([{ value: "new todo" }]);
});

test("should check remode_todo action", () => {
  const beforeState = [{ value: "0" }];

  const removeTodoAction: RemoveTodo = {
    type: "REMOVE_TODO",
    payload: 0, // index
  };

  expect(todoReducer(beforeState, removeTodoAction)).toEqual([]);
});

test("should check empty action", () => {
  expect(todoReducer([], {} as any)).toEqual([]);
});
