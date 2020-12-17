import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {postBarcode} from '../../fetches/BookFetch';
import MyBookDetail from '../../components/myBooksPage/MyBookDetail'

const AddBook = ({currentUser}) => {

  const [newBook, setNewBook] = useState({});
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    if (barcode.length === 13) {
      postBarcode(barcode, currentUser)
      .then(data => setNewBook(data))
    }
  }, [barcode])

  const handleSubmit = (event) => {
      event.preventDefault();
      setBarcode(event.target.isbn.value);
  }

  if (Object.keys(currentUser).length === 0 && currentUser.constructor === Object){
    return <p>Please select a user to continue</p>
  }

  if (Object.keys(newBook).length === 0 && newBook.constructor === Object){
    return (
      <>
        <h1>newBook</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="isbn" placeholder="ISBN Number" />
          <button type="submit">Lookup Barcode</button>
        </form>
      </>
    )
  } else {
    return (
      <>
        <h1>newBook</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="isbn" placeholder="ISBN Number" />
          <button type="submit">Lookup Barcode</button>
        </form>
        <MyBookDetail newBook="newBook" />
      </>
    )
  }

}

export default AddBook;
