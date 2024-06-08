import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookList from "./index";
import { Book } from "../../../generated/graphql";

const mockBooks: Book[] = [
  {
    title: "Book 1",
    author: "Author 1",
    coverPhotoURL: "book1.jpg",
    readingLevel: "Level 1",
  },
  {
    title: "Book 2",
    author: "Author 2",
    coverPhotoURL: "book2.jpg",
    readingLevel: "Level 2",
  },
];

const mockHandleAddToReadingList = jest.fn();
const mockIsBookInReadingList = jest.fn();

describe("BookList component", () => {
  it("renders skeleton loaders when loading is true", () => {
    render(
      <BookList
        books={[]}
        loading={true}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );

    const skeletonLoaders = screen.getAllByTestId("skeleton-loader");
    expect(skeletonLoaders.length).toBe(12);
  });

  it("renders book cards when loading is false", () => {
    render(
      <BookList
        books={mockBooks}
        loading={false}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );

    const bookCards = screen.getAllByTestId("book-card");
    expect(bookCards.length).toBe(mockBooks.length);
  });

  it("passes the correct props to BookCard component", () => {
    render(
      <BookList
        books={mockBooks}
        loading={false}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );

    const bookCards = screen.getAllByTestId("book-card");
    bookCards.forEach((bookCard, index) => {
      expect(bookCard).toHaveTextContent(mockBooks[index].title ?? "");
      expect(bookCard).toHaveTextContent(mockBooks[index].author ?? "");
      expect(bookCard).toHaveTextContent(mockBooks[index].readingLevel ?? "");
    });
  });
});
