import Card from "@mui/material/Card";
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
    <Card sx={{ maxWidth: 345 }}>
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
      <CardActions>
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
      </CardActions>
    </Card>
  );
}
