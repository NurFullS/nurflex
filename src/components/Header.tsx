import React from 'react'
import axios from 'axios'
import '../styles/header.css'
import { Button, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

const Header = ({ searchInput, setSearchInput }: HeaderProps) => {
  const userName = localStorage.getItem('username')
  const [open, setOpen] = React.useState(false)
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

  return (
    <>
      <header>
        <h1 className='title-header'>NurFlex</h1>

        <div className='search-bar' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
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
          <Button sx={{ color: 'red' }} onClick={() => setOpen(!open)}>Выйти</Button>
        </div>
      </header>

      {open && (
        <div className='modal-header-delete'>
          <h1>Вы уверены, что хотите выйти?</h1>
          <Button
            sx={{ color: 'black', fontSize: '16px' }}
            onClick={() => deleteUser(Number(localStorage.getItem('userId')))}
          >Да</Button>
          <Button sx={{ color: 'red' }} onClick={() => setOpen(false)}>Нет</Button>
        </div>
      )}
    </>
  )
}

export default Header
