import React from 'react';
import Book from './Book';
import '../../styles/SearchResults.css';

const SearchResults = ({ books }) => {
	const bookList = books.map((book, i) => {
		return <Book key={i} book={book} />;
	});

	return (
		<>
			<h3>Search results:</h3>
			<div className="search-results-container">{bookList}</div>
		</>
	);
};

export default SearchResults;
