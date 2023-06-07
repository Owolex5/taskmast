import { useState } from 'react'
import api from '../services/api/index'
import '../styles/App.scss'
import Header from './Header'
import Main from './Main'

function App() {

  const [currentBoard, setCurrentBoard] = useState(api.board.getAll()[0])
  const [currentColumn, setCurrentColumn] = useState('')
  const [inputTitleBoard, setInputTitleBoard] = useState(currentBoard.name)
  const [inputColumnNames, setInputColumnNames] = useState('')
  const [modal, setModal] = useState(false)
  const [modalEditBoard, setModalEditBoard] = useState(false)

  console.log(currentBoard, 'currentBoard')
  
  const handleClickBoard = (ev) => {
    const { id } = ev.currentTarget
    setCurrentBoard(api.board.getById(id))
  }

  const handleGetCurrentColumn = (ev) => {
    const { id } = ev.target
    setCurrentColumn(api.column.getById(id))
  }

  const updateBoard = (ev) => {
    ev.preventDefault()
    api.board.updateById(currentBoard.id, inputTitleBoard)
    api.column.updateById(currentColumn.id, inputColumnNames[currentColumn.id])
    setModalEditBoard(false)
  }

  return (
    <div className='main'>
      <Header 
        currentBoard={currentBoard} 
        handleClickBoard={handleClickBoard}
        handleGetCurrentColumn={handleGetCurrentColumn}
        updateBoard={updateBoard}
        inputTitleBoard={inputTitleBoard}
        setInputTitleBoard={setInputTitleBoard}
        inputColumnNames={inputColumnNames}
        setInputColumnNames={setInputColumnNames}
        setModal={setModal}
        modalEditBoard={modalEditBoard}
        setModalEditBoard={setModalEditBoard}
      >
      </Header>
      <Main 
        currentBoard={currentBoard}
        currentColumn={currentColumn}
        inputColumnNames={inputColumnNames}
        modal={modal}
        setModal={setModal}
      >
      </Main>
    </div>
  )
}

export default App