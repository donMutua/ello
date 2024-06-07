import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={book?.coverPhotoURL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {book.title}
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
          Reading Level : {book.readingLevel}
        </Typography>
      </CardActions>
    </Card>
  );
}
