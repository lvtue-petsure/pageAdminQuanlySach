import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import './Book.css';

const BookForm = ({ editingBook, setEditingBook, refreshBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    } else {
      setTitle('');
      setAuthor('');
    }
  }, [editingBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await supabase.from('books').update({ title, author }).eq('id', editingBook.id);
      setEditingBook(null);
    } else {
      await supabase.from('books').insert([{ title, author }]);
    }
    setTitle('');
    setAuthor('');
    refreshBooks();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} required />
      <button type="submit">{editingBook ? "Update" : "Add"}</button>
    </form>
  );
};

export default BookForm;
