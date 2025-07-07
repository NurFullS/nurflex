import React, { useState } from 'react'
import axios from 'axios'
import '../styles/header.css'
import { Button, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@700&family=Raleway:wght@700&family=Oswald:wght@700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

type User = {
  id: number;
  username: string;
  email: string;
};

const Header = () => {
  const userName = localStorage.getItem('username')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const getInitial = (name: string | null) => {
    if (!name || name.trim() === '') return ''
    return name.trim().charAt(0).toUpperCase()
  }

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      alert('Не удалось удалить аккаунт. Попробуйте позже.');
    }
  };

  const openVal = () => {
    setOpen(!open)
  }

  return (
    <>
      <header>
        <h1 className='title-header'>NurFlex</h1>

        <div
          className='search-bar'
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <TextField
            placeholder="Введите название фильма..."
            size="small"
            variant="outlined"
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                paddingRight: '8px',
              },
              '& input': {
                padding: '10px 12px',
              },
            }}
            InputProps={{
              endAdornment: <Search sx={{ cursor: 'pointer', color: '#666' }} />,
            }}
          />
        </div>

        <div className='profile-container'>
          <div className='avatar-name'>{getInitial(userName)}</div>
          <Button sx={{
            color: 'red',
          }}
            onClick={openVal}
          >Выйти</Button>
        </div>
      </header>
      {open && <div className='modal-header-delete'>
        <h1>Вы уверенны что хотите выйти?</h1>
        <Button
        sx={{
          color:'black',
          fontSize: '16px'
        }} 
        onClick={(e) => deleteUser(Number(localStorage.getItem('userId')))}
        >Да</Button>
        <Button sx={{
          color: 'red'
        }}
        onClick={(e) => setOpen(false)}
        >Нет</Button>
      </div>}
    </>
  )
}

export default Header
