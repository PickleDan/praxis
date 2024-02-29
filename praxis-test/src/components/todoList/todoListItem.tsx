import {
  Box,
  Button,
  CircularProgress,
  Divider,
  ListItem,
  Typography,
} from "@mui/material";
import { memo } from "react";

interface TodoItemProps {
  text: string;
  id: number;
  isRemoving: boolean;
  handleRemove: (id: number) => void;
}

const TodoListItemComponent = (props: TodoItemProps) => {
  const { id, text, handleRemove, isRemoving } = props;

  return (
    <Box key={id}>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{text}</Typography>
        <Box
          sx={{
            minWidth: "120px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isRemoving ? (
            <CircularProgress color={"error"} />
          ) : (
            <Button
              onClick={() => handleRemove(id)}
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
};

export const TodoListItem = memo(TodoListItemComponent);
