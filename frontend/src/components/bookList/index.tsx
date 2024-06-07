import { Grid, Box, Skeleton } from "@mui/material";
import { useQuery } from "@apollo/client";

import BookCard from "../bookCard";

import {
  GetBooksDocument,
  GetBooksQuery,
  GetBooksQueryVariables,
} from "../../../generated/graphql";
import Error from "../../pages/error/error";

const BookList = () => {
  const { data, loading, error } = useQuery<
    GetBooksQuery,
    GetBooksQueryVariables
  >(GetBooksDocument);

  const books = data?.books;

  //on error show the Error page

  if (error) {
    return <Error />;
  }
  return (
    <Grid container spacing={2} mt={3}>
      {loading
        ? Array.from(new Array(12)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ height: "100%", display: "flex" }}>
                <Skeleton variant="rectangular" width="100%" height={250} />
              </Box>
            </Grid>
          ))
        : books &&
          books.map((book) => (
            <Grid key={book?.author} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ height: "100%", display: "flex" }}>
                {book && <BookCard book={book} />}
              </Box>
            </Grid>
          ))}
    </Grid>
  );
};

export default BookList;
