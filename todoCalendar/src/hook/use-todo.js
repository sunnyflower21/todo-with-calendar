import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const defaultTodoList = [];

const TODO_LIST_KEY = "TODO_LIST_KEY";
const saveTodoList = (newTodoList) => {
  AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
};

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
    saveTodoList(newTodoList);
  };
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
    saveTodoList(newTodoList);
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
    saveTodoList(newTodoList);
  };
  const resetInput = () => {
    setInput("");
  };

  const filterTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, "date");
    return isSameDate;
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    if (result) {
      const newTodoList = JSON.parse(result);

      setTodoList(newTodoList);
    }
  };

  return {
    filterTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
    todoList,
  };
};
