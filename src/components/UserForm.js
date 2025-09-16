import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import './User.css';
const UserForm = ({ editingUser, setEditingUser, refreshUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await supabase.from('users').update({ name, email }).eq('id', editingUser.id);
      setEditingUser(null);
    } else {
      await supabase.from('users').insert([{ name, email }]);
    }
    setName('');
    setEmail('');
    refreshUsers();
  };

  return (
  <form onSubmit={handleSubmit} className="user-form">
  <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
  <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
  <button type="submit">{editingUser ? "Update" : "Add"}</button>
</form>
  );
};

export default UserForm;
