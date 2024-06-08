import {
  Box,
  Paper,
  InputBase,
  InputAdornment,
  Typography,
  ClickAwayListener,
} from "@mui/material";
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
import SearchResultsDropdown from "../../components/Search";

const Home = () => {
  const { data, loading, error } = useQuery<
    GetBooksQuery,
    GetBooksQueryVariables
  >(GetBooksDocument);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [readingList, setReadingList] = useState<Book[]>(() => {
    const savedList = localStorage.getItem("readingList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const handleSelectBook = (book: Book) => {
    setSearchQuery(book?.title ?? "");
    setShowDropdown(false);
  };

  const handleAddToReadingList = (book: Book | null) => {
    if (book === null) {
      return;
    }
    if (readingList.some((b) => b.title === book.title)) {
      setReadingList(readingList.filter((b) => b.title !== book.title));
    } else {
      setReadingList([...readingList, book]);
    }
  };

  //check if the book is in the reading list
  const isBookInReadingList = (book: Book | null) => {
    if (book === null) {
      return false;
    }

    return readingList.some((b) => b.title === book.title);
  };
  const handleClickAway = () => {
    setShowDropdown(false);
  };

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
      <Box
        sx={{
          width: "90%",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Book Assignment
        </Typography>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
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
            {showDropdown && (
              <Paper
                sx={{
                  maxHeight: "calc(1.5em + 2px + 2px + 2px + 2px + 2px) * 5",
                  overflow: "auto",
                }}
              >
                <SearchResultsDropdown
                  books={filteredBooks as Book[]}
                  onSelectBook={handleSelectBook}
                />
              </Paper>
            )}
          </div>
        </ClickAwayListener>
      </Box>

      {loading || filteredBooks ? (
        <BookList
          books={filteredBooks as Book[]}
          loading={loading}
          handleAddToReadingList={handleAddToReadingList}
          isBookInReadingList={isBookInReadingList}
        />
      ) : null}

      {loading || readingList.length ? (
        <>
          <Typography variant="h5" component="h2" mt={3}>
            Reading List
          </Typography>
          <BookList
            books={readingList}
            loading={loading}
            handleAddToReadingList={handleAddToReadingList}
            isBookInReadingList={isBookInReadingList}
          />
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2" mt={10}>
            Reading List
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              color: "#ff6f61",
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
              backgroundColor: "#fff8dc",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Your reading list is looking a bit bare. Start adding books and let
            the adventure begin!
          </Typography>
        </>
      )}
    </Layout>
  );
};

export default Home;
