import { useFetch } from "./useFetch";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TodoItem } from "./types";

const TodoList = () => {
  const { todoList } = useFetch();

  const [filterText, setFilterText] = useState<string>("");
  const [filteredTodoList, setFilteredTodoList] =
    useState<TodoItem[]>(todoList);

  useEffect(() => {
    const filteredList = todoList.filter((todoItem) => {
      if (filterText.length < 3) {
        return true;
      }
      return todoItem.todo.toLowerCase().includes(filterText.toLowerCase());
    });
    setFilteredTodoList(filteredList);
  }, [filterText, todoList]);

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
                <Button onClick={() => {}} color="error" variant="contained">
                  Remove
                </Button>
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
