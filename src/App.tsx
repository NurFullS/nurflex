import React, { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'

const App = () => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <Main searchInput={searchInput} />
    </>
  )
}

export default App