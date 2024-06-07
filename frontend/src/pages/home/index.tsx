import { Box, Paper, InputBase, InputAdornment } from "@mui/material";
import { useQuery } from "@apollo/client";

import {
  GetBooksDocument,
  GetBooksQuery,
  GetBooksQueryVariables,
  Book,
} from "../../../generated/graphql";
import Error from "../../pages/error/error";

import SearchIcon from "../../assets/icons/icon-search.svg";
import BookList from "../../components/readingList";
import Layout from "../../Layout";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const Home = () => {
  const { data, loading, error } = useQuery<
    GetBooksQuery,
    GetBooksQueryVariables
  >(GetBooksDocument);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [readingList, setReadingList] = useState<Book[]>(() => {
    const savedList = localStorage.getItem("readingList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToReadingList = (book: Book) => {
    if (readingList.some((b) => b.title === book.title)) {
      setReadingList(readingList.filter((b) => b.title !== book.title));
    } else {
      setReadingList([...readingList, book]);
    }
  };

  //on error show the Error page

  if (error) {
    return <Error />;
  }

  if (!data) {
    return null;
  }

  const filteredBooks = debouncedSearchQuery
    ? (data &&
        data.books?.filter(
          (book) =>
            book?.title &&
            book.title
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
        )) ||
      []
    : [];

  return (
    <Layout>
      <Box>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "default",
            p: 1,
            backgroundColor: "#f9f9f96c",
            border: "none",
          }}
        >
          <InputBase
            placeholder="Search"
            sx={{
              ml: 1,
              flex: 1,
              border: "none",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <img
                  src={SearchIcon}
                  alt="search icon"
                  width={20}
                  height={20}
                />
              </InputAdornment>
            }
          />
        </Paper>
      </Box>

      {loading || filteredBooks ? (
        <BookList books={filteredBooks ?? []} loading={loading} />
      ) : null}
    </Layout>
  );
};

export default Home;
