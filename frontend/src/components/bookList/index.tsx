import { Grid, Box } from "@mui/material";
import BookCard from "../bookCard";
import { dummyData } from "../../dummyData";

interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}

const BookList = () => {
  return (
    <Grid container spacing={2} mt={3}>
      {dummyData.data.books.map((book: Book) => (
        <Grid key={book.author} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ height: "100%", display: "flex" }}>
            <BookCard book={book} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
