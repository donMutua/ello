const graphqlResponse = {
  data: {
    books: [
      {
        author: "Reese Smith",
        coverPhotoURL: "assets/image2.webp",
        readingLevel: "H",
        title: "Curious Princess and the Enchanted Garden",
      },
      {
        author: "Jordan Jones",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
        title: "Clever Monster on the Wonder Island",
      },
      {
        author: "Quinn Brown",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
        title: "Happy Knight and the Magic Spell",
      },
    ],
  },
};

const assetsPath = "src/";

export const dummyData = {
  ...graphqlResponse,
  data: {
    ...graphqlResponse.data,
    books: graphqlResponse.data.books.map((book) => ({
      ...book,
      coverPhotoURL: `${assetsPath}${book.coverPhotoURL}`,
    })),
  },
};

console.log(dummyData);
