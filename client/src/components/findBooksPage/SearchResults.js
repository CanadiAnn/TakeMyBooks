import React from 'react';
import Book from './Book';

const SearchResults = ({ books }) => {
	const bookList = books.map((book, i) => {
		return <Book key={i} book={book} />;
	});

	return <ul>{bookList}</ul>;
};

export default SearchResults;