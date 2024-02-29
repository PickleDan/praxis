import { useFetch } from "./useFetch";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TodoItem } from "./types";

const TodoList = () => {
  const { todoList, setTodoList } = useFetch();

  const [filterText, setFilterText] = useState<string>("");
  const [filteredTodoList, setFilteredTodoList] =
    useState<TodoItem[]>(todoList);

  const [itemsRemoving, setItemsRemoving] = useState<number[]>([]);

  useEffect(() => {
    const filteredList = todoList.filter((todoItem) => {
      if (filterText.length < 3) {
        return true;
      }
      return todoItem.todo.toLowerCase().includes(filterText.toLowerCase());
    });
    setFilteredTodoList(filteredList);
  }, [filterText, todoList]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "todo_removed") {
        console.log(`Todo with ID ${event.data.id} removed.`);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleRemove = (id: number) => {
    setItemsRemoving((prevState) => [...prevState, id]);
    setTimeout(() => {
      setTodoList((prevState) => prevState.filter((todo) => todo.id !== id));
      setItemsRemoving((prevState) =>
        prevState.filter((itemId) => itemId !== id),
      );
      window.postMessage({ type: "todo_removed", id }, "*");
    }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Filter todos"
          variant="outlined"
          helperText={"Filter works after the second character entered"}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{
            marginRight: "12px",
          }}
        />

        <Chip
          sx={{ marginRight: "12px" }}
          label={`Total items: ${todoList.length}`}
        />
      </Box>

      <List>
        {filteredTodoList.map((todo) => {
          return (
            <Box key={todo.id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{todo.todo}</Typography>
                <Box
                  sx={{
                    minWidth: "120px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {itemsRemoving.includes(todo.id) ? (
                    <CircularProgress color={"error"} />
                  ) : (
                    <Button
                      onClick={() => handleRemove(todo.id)}
                      color="error"
                      variant="contained"
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default TodoList;
