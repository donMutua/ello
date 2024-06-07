import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Maybe, Book as BookType } from "../../../generated/graphql";

type Book = Maybe<BookType>;

interface BookCardProps {
  book: Book;
}

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function BookCard({ book }: BookCardProps) {
  const assetsPath = "src/";
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={book ? `${assetsPath}${book.coverPhotoURL}` : undefined}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {book?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book?.author}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "semibold",
            fontSize: "1rem",
            color: "#335c6E",
          }}
        >
          Reading Level : {book?.readingLevel}
        </Typography>
        <IconButton
          aria-label="add to reading list"
          sx={{
            color: "#f76434",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
