import { Grid, Box, Skeleton } from "@mui/material";
import { Book } from "../../../generated/graphql";
import BookCard from "../bookCard";

interface BookListProps {
  books: Book[];
  loading: boolean;
  handleAddToReadingList: (book: Book | null) => void; // Updated type
  isBookInReadingList: (book: Book | null) => boolean;
}

const BookList = ({
  books,
  loading,
  handleAddToReadingList,
  isBookInReadingList,
}: BookListProps) => {
  return (
    <Grid container spacing={2} mt={3}>
      {loading
        ? Array.from(new Array(12)).map((_, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              data-testid="skeleton-loader"
            >
              <Box sx={{ height: "100%", display: "flex" }}>
                <Skeleton variant="rectangular" width="100%" height={250} />
              </Box>
            </Grid>
          ))
        : books &&
          books.map((book) => (
            <Grid
              key={`${book?.title}-${book?.author}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              data-testid="book-card"
            >
              <Box sx={{ height: "100%", display: "flex" }}>
                {book && (
                  <BookCard
                    book={book}
                    handleAddToReadingList={handleAddToReadingList}
                    isBookInReadingList={isBookInReadingList}
                  />
                )}
              </Box>
            </Grid>
          ))}
    </Grid>
  );
};

export default BookList;
