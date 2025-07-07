import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id: number;
  username: string;
  email: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await axios.get<User[]>('http://localhost:8080/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
    localStorage.removeItem('username')
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.username} ({u.email})
            <button onClick={(e) => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;