// BookList.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import BookForm from "./BookForm";
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('titlebook')
      .select(`
        id,
        nametitle,
        fileimage,
        category,
        createdon,
        watching,
        chapter(id, chapternumber, chaptertitle, content)
      `)
      .order('createdon', { ascending: false });
    if (!error) setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cuốn sách này?")) {
      await supabase.from('chapter').delete().eq('titlebookid', id);
      await supabase.from('titlebook').delete().eq('id', id);
      fetchBooks();
    }
  };

  const handleAdd = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="book-container">
      <h3>Books</h3>
      <button onClick={handleAdd}>Add Book</button>

      <ul className="book-list">
        {books.map(b => (
          <li key={b.id} className="book-item">
            <img src={b.fileimage || 'https://via.placeholder.com/80x120?text=No+Image'} alt={b.nametitle} className="book-image"/>
            <div>
              <h4>{b.nametitle}</h4>
              <p>Category: {b.category}</p>
              <p>Watching: {b.watching}</p>
              <p>Chapters:</p>
              <ul>
                {b.chapter.map(ch => (
                  <li key={ch.id}>{ch.chapternumber}. {ch.chaptertitle}</li>
                ))}
              </ul>
              <button onClick={() => handleEdit(b)}>Edit</button>
              <button onClick={() => handleDelete(b.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>X</button>
            <BookForm 
              editingBook={editingBook} 
              setEditingBook={setEditingBook} 
              refreshBooks={() => { fetchBooks(); handleCloseForm(); }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
