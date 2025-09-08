import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import UserForm from "./UserForm";
import './User.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    await supabase.from('users').delete().eq('id', id);
    fetchUsers();
  };

  return (
    <div className="user-container">
  <h3>Users</h3>
  <UserForm editingUser={editingUser} setEditingUser={setEditingUser} refreshUsers={fetchUsers} />
  <ul className="user-list">
    {users.map(u => (
      <li key={u.id}>
        <span className="user-info">{u.name} - {u.email}</span>
        <div className="user-actions">
          <button className="edit-btn" onClick={() => setEditingUser(u)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default UserList;
