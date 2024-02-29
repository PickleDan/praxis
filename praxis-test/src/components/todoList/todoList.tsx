import { useFetch } from "./useFetch";

const TodoList = () => {
  const { todoList } = useFetch();

  return (
    <div>
      {todoList.map((item) => {
        return <div>{item.todo}</div>;
      })}
    </div>
  );
};

export default TodoList;
