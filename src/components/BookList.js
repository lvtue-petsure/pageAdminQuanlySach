import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BookForm from "./BookForm";
import './Book.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*');
    if (!error) setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cuốn sách này?")) {
      await supabase.from('books').delete().eq('id', id);
      fetchBooks();
    }
  };

  return (
    <div className="book-container">
      <h3>Books</h3>
      <BookForm editingBook={editingBook} setEditingBook={setEditingBook} refreshBooks={fetchBooks} />
      <ul className="book-list">
        {books.map(b => (
          <li key={b.id}>
            <span className="book-info">{b.title} - {b.author}</span>
            <div className="book-actions">
              <button className="edit-btn" onClick={() => setEditingBook(b)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(b.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
