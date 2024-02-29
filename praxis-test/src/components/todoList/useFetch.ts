import { TodoItem } from "./types";
import { useEffect, useState } from "react";

const URL = "https://dummyjson.com/todos";

export function useFetch() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const res = await response.json();
        const todoListDTO = res.todos;

        const mappedTodoList = todoListDTO.map(
          (item: any): TodoItem => ({
            id: item.id,
            todo: item.todo,
            completed: item.completed,
            userId: item.userId,
          }),
        );

        setTodoList(mappedTodoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { todoList };
}
