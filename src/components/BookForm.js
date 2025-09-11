import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import './Book.css';

const BookForm = ({ editingBook, setEditingBook, refreshBooks }) => {
  const [nametitle, setNametitle] = useState('');
  const [fileimage, setFileimage] = useState('');
  const [category, setCategory] = useState('');
  const [chapters, setChapters] = useState([]);
  const [idTitileBook, setIdTitileBook] = useState('');
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterContent, setNewChapterContent] = useState('');

  useEffect(() => {
    if (editingBook) {
      setNametitle(editingBook.nametitle);
      setFileimage(editingBook.fileimage);
      setCategory(editingBook.category);
      setChapters(editingBook.chapter || []);
      setIdTitileBook(editingBook.id);
    } else {
      setNametitle('');
      setFileimage('');
      setCategory('');
      setChapters([]);
    }
    setNewChapterTitle('');
    setNewChapterContent('');
  }, [editingBook]);

  // Thay đổi chapter hiện có
  const handleChapterChange = (id, field, value) => {
    setChapters(prev => prev.map(ch => ch.id === id ? { ...ch, [field]: value } : ch));
  };

  // Lưu chapter đã chỉnh sửa
  const handleSaveChapters = async () => {
    for (const ch of chapters) {
      await supabase.from('chapter').update({
        chaptertitle: ch.chaptertitle,
        content: ch.content
      }).eq('id', ch.id);
    }
    refreshBooks();
  };
  const handlUpdateTitle = async () => {
    await supabase.from('titlebook').update({ nametitle, fileimage, category })
      .eq('id', editingBook.id);
      refreshBooks();
}

  const handleDeleteChapters =  async (id) => {
      await supabase.from('chapter')
                    .delete()
                    .eq('id', id);
    refreshBooks();
  };

  // Thêm chapter mới
  const handleAddChapter = async () => {
    if (newChapterTitle.trim() === '') return;
    const nextNumber = chapters.length + 1;
    const { data: newCh, error } = await supabase.from('chapter').insert([{
      titlebookid: editingBook.id,
      chapternumber: nextNumber,
      chaptertitle: newChapterTitle,
      content: newChapterContent
    }]).select().single();
    if (!error && newCh) {
      setChapters([...chapters, newCh]);
      setNewChapterTitle('');
      setNewChapterContent('');
      refreshBooks();
    }
  };

  // Thêm hoặc cập nhật Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingBook) {
      await supabase.from('titlebook').update({ nametitle, fileimage, category })
        .eq('id', editingBook.id);

      if (newChapterTitle.trim() !== '') {
        await handleAddChapter();
      }

      handleSaveChapters();
      setEditingBook(null);
    } else {
      const { data: newBook, error } = await supabase.from('titlebook')
        .insert([{ nametitle, fileimage, category, createdon: new Date(), watching: 0 }])
        .select()
        .single();
      if (!error && newBook) {
        await supabase.from('chapter').insert([{
          titlebookid: newBook.id,
          chapternumber: 1,
          chaptertitle: newChapterTitle,
          content: newChapterContent
        }]);
      }
    }

    setNametitle('');
    setFileimage('');
    setCategory('');
    setChapters([]);
    setNewChapterTitle('');
    setNewChapterContent('');
    refreshBooks();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editingBook ? 'Edit Book' : 'Add Book'}</h2>
      <input type="text" placeholder="Title" value={nametitle} onChange={e => setNametitle(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={fileimage} onChange={e => setFileimage(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
      {(editingBook && (<div>
                <button
                  type="button"
                  onClick={() => handlUpdateTitle()}>
                Update Title
              </button>
              </div>))}
      {editingBook && (
        <div className="chapters-container">
          <h3>Chapters</h3>
          {chapters.map(ch => (
            <div key={ch.id} className="chapter-item">
              <input
                type="text"
                value={ch.chaptertitle}
                onChange={e => handleChapterChange(ch.id, 'chaptertitle', e.target.value)}
                placeholder="Chapter Title"
              />
              <textarea
                value={ch.content}
                onChange={e => handleChapterChange(ch.id, 'content', e.target.value)}
                placeholder="Content"
              />
              <div className="chapter-actions">
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteChapters(ch.id)}>
                Delete Chapters
              </button>
                </div>

            </div>
            
          ))}
          <button type="button" className="save-chapters-btn" onClick={handleSaveChapters}>
            Save Chapters
          </button>

          <div className="chapter-add">
            <input
              type="text"
              placeholder="New Chapter Title"
              value={newChapterTitle}
              onChange={e => setNewChapterTitle(e.target.value)}
            />
            <textarea
              placeholder="New Chapter Content"
              value={newChapterContent}
              onChange={e => setNewChapterContent(e.target.value)}
            />
            <button type="button" onClick={handleAddChapter}>Add Chapter</button>
          </div>
        </div>
      )}
      {!editingBook && ( <div className="chapter-item new-chapter">
        <h3>Chapters</h3>
        <input
          type="text"
          placeholder="New Chapter Title"
          value={newChapterTitle}
          onChange={e => setNewChapterTitle(e.target.value)}
        />
        <textarea
          placeholder="New Chapter Content"
          value={newChapterContent}
          onChange={e => setNewChapterContent(e.target.value)}
        />
        <button type="submit" className="save-book-btn">
     Save Book
  </button>
      </div>
    )}
    </form>
  );
};

export default BookForm;
