import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./User.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [handleUser, setHandleUser] = useState(null);
  const [isUserChange, setUserChange] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (!error) {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("users").delete().eq("id", id);
    fetchUsers();
  };

  const onUserEditing = (field, value) => {
    setUserChange(true);
    setHandleUser({ ...handleUser, [field]: value });
  };

  const handleUserEditing = async (user) => {
    // Nếu chưa chọn user để edit
    if (handleUser?.id !== user.id) {
      setUserChange(false);
      setHandleUser(user);
      return;
    }

    // Nếu nhấn Update
    if (isUserChange) {
      await supabase
        .from("users")
        .update({
          userName: handleUser?.userName,
          email: handleUser?.email,
          password: handleUser?.password,
          isActive: handleUser?.isActive,
        })
        .eq("id", handleUser.id);

      setHandleUser(null);
      setToastMessage("Cập nhật thành công!");
      setTimeout(() => setToastMessage(""), 3000);
      fetchUsers();
    }
  };

  const cancelEditing = () => {
    setHandleUser(null);
    setUserChange(false);
  };

  const toggleActive = () => {
    setUserChange(true);
    setHandleUser({ ...handleUser, isActive: !handleUser?.isActive });
  };

  return (
    <div className="user-container">
      <h2 className="title">Quản lý Users</h2>

      {toastMessage && <div className="toast">{toastMessage}</div>}

      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <div className="user-card">
              <div className="user-info">
                {/* Row 1 */}
                <div className="form-row">
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      type="text"
                      value={
                        handleUser?.id === u.id
                          ? handleUser?.userName
                          : u.userName
                      }
                      disabled={handleUser?.id !== u?.id}
                      placeholder="Nhập User Name"
                      onChange={(e) =>
                        onUserEditing("userName", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={
                        handleUser?.id === u.id ? handleUser?.email : u.email
                      }
                      disabled={handleUser?.id !== u?.id}
                      placeholder="Nhập Email"
                      onChange={(e) => onUserEditing("email", e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                {handleUser?.id === u.id && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        value={handleUser?.password || ""}
                        placeholder="Nhập Password"
                        onChange={(e) =>
                          onUserEditing("password", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Trạng thái</label>
                      <button
                        type="button"
                        className={`toggle-btn ${
                          handleUser?.isActive ? "active" : "inactive"
                        }`}
                        onClick={toggleActive}
                      >
                        {handleUser?.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="user-actions">
                {handleUser?.id === u.id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleUserEditing(u)}
                    >
                      Update
                    </button>
                    <button className="cancel-btn" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleUserEditing(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
