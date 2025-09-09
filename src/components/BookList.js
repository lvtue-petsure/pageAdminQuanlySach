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
        chapter(id, chapternumber, chaptertitle)
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
      <div className="book-header">
        <h3>Books</h3>
        <button className="add-btn" onClick={handleAdd}>+ Add Book</button>
      </div>

      <ul className="book-list">
        {books.map(b => (
          <li key={b.id} className="book-item">
            <img 
              src={b.fileimage || 'https://via.placeholder.com/100x140?text=No+Image'} 
              alt={b.nametitle} 
              className="book-image"
            />
            <div className="book-info">
              <h4>{b.nametitle}</h4>
              <p><strong>Category:</strong> {b.category}</p>
              <p><strong>Watching:</strong> {b.watching}</p>
              {b.chapter.length > 0 && (
                <>
                  <p><strong>Chapters:</strong></p>
                  <ul className="chapter-list">
                    {b.chapter.map(ch => (
                      <li key={ch.id}>{ch.chapternumber}. {ch.chaptertitle}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="book-actions">
                <button className="edit-btn" onClick={() => handleEdit(b)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(b.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
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
