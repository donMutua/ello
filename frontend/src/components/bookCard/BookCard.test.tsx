import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import BookCard from "./";
import { Book } from "../../../generated/graphql";

const mockBook: Book = {
  title: "Test Book",
  author: "Test Author",
  coverPhotoURL: "test.jpg",
  readingLevel: "Test Level",
};

const mockHandleAddToReadingList = jest.fn();
const mockIsBookInReadingList = jest.fn();

describe("BookCard", () => {
  it("renders book card", () => {
    render(
      <BookCard
        book={mockBook}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByLabelText("reading level")).toBeInTheDocument();
  });

  it("calls handleAddToReadingList when add button is clicked", () => {
    render(
      <BookCard
        book={mockBook}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );
    fireEvent.click(screen.getByLabelText(/Add to Reading List/i));
    expect(mockHandleAddToReadingList).toHaveBeenCalledTimes(1);
  });

  it("calls isBookInReadingList when add button is clicked", () => {
    render(
      <BookCard
        book={mockBook}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );

    fireEvent.click(screen.getByLabelText(/Add to Reading List/i));
    expect(mockIsBookInReadingList).toHaveBeenCalled();
  });

  it("displays the FavoriteIcon when isBookInReadingList returns true", () => {
    mockIsBookInReadingList.mockReturnValue(true);
    render(
      <BookCard
        book={mockBook}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );
    expect(screen.getByLabelText(/favoriteIcon/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/favoriteOutlineIcon/i)
    ).not.toBeInTheDocument();
  });

  it("displays the FavoriteOutlineIcon when isBookInReadingList returns false", () => {
    mockIsBookInReadingList.mockReturnValue(false);
    render(
      <BookCard
        book={mockBook}
        handleAddToReadingList={mockHandleAddToReadingList}
        isBookInReadingList={mockIsBookInReadingList}
      />
    );
    expect(screen.getByLabelText(/favoriteOutlineIcon/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/favoriteIcon/i)).not.toBeInTheDocument();
  });
});
