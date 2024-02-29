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

const TodoList = () => {
  const { todoList } = useFetch();

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
          label="Outlined"
          variant="outlined"
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
        {todoList.map((todo) => {
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
