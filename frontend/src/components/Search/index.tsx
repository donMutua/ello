import React from "react";
import {
  Paper,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Book } from "../../../generated/graphql";

interface SearchResultsDropdownProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  books,
  onSelectBook,
}) => {
  const assetsPath = "src/";
  return (
    <Paper style={{ position: "absolute", zIndex: 1, width: "100%" }}>
      <List>
        {books.map((book) => (
          <ListItemButton key={book.title} onClick={() => onSelectBook(book)}>
            <ListItemAvatar>
              <Avatar
                src={book ? `${assetsPath}${book.coverPhotoURL}` : undefined}
              />
            </ListItemAvatar>
            <ListItemText primary={book.title} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResultsDropdown;
