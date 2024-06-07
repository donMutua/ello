import {
  Box,
  Paper,
  InputBase,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import SearchIcon from "../../assets/icons/icon-search.svg";
import BookList from "../../components/bookList";
import Layout from "../../Layout";
import { useState } from "react";

const Home = () => {
  const [readingLevel, setReadingLevel] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setReadingLevel(event.target.value as string);
  };
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f76434",
            color: "black",
          }}
        >
          All books
        </Button>
        <FormControl sx={{ flexGrow: 0.7 }}>
          <InputLabel id="reading-level">Level</InputLabel>
          <Select
            labelId="reading-level"
            id="reading-level-select"
            value={readingLevel}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <BookList />
    </Layout>
  );
};

export default Home;
