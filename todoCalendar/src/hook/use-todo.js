import dayjs from "dayjs";
import { useState } from "react";

const defaultTodoList = [
  {
    id: 1,
    content: "수영하기",
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: "강의 듣기",
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: "소원노트 쓰기",
    date: dayjs(),
    isSuccess: true,
  },
];

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];

    setTodoList(newTodoList);
  };
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map((todo, index) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    setTodoList(newTodoList);
  };
  const resetInput = () => {
    setInput("");
  };

  return {
    todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  };
};
