import { useEffect, useState } from 'react'
import Status from './reusableComponents/Status'
import Modal from './reusableComponents/Modal'
import ModalDelete from './reusableComponents/ModalDelete'
import api from '../services/api/index'

const ModalViewTask = ({modal, setModal, currentBoard, currentTask, handleGetCurrentSubtask, currentSubtask, column, setColumn}) => {

    const [check, setCheck] = useState(false)
    const [moreOptions, setMoreOptions] = useState(false)
    const [modalEditTask, setModalEditTask] = useState(false)
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [inputTitleTask, setInputTitleTask] = useState(currentTask.title)
    const [textAreaDescription, setTextAreaDescription] = useState(currentTask.description)
    const [subtasks] = useState(currentTask.subtasks || [])
    const [inputSubtasksNames, setInputSubtasksNames] = useState('')

    console.log(column, 'column in modal view task')

    useEffect(() => {
        const subtasksDetails = {}
        for (const subtask of currentTask.subtasks) {
            subtasksDetails[subtask.id] = subtask.title
        }
        setInputSubtasksNames(subtasksDetails)
    }, [currentTask.subtasks, subtasks.id])

    const handleSubtaskForm = () => {
        setCheck(!check)
    }

    const handleClickCloseModal = (ev) => {
        if (ev.target.className === 'modal') {
            setModal(false)
        }
    }

    const handleClickMoreOptions = () => {
        setMoreOptions(true)
    }

    const handleClickEditTask = () => {
        setModalEditTask(true)
    }

    const handleClickDeleteTask = () => {
        setModalDeleteTask(true)
    }

    const updateTask = (ev) => {
        ev.preventDefault()
        api.task.updateById(currentTask.id, inputTitleTask, textAreaDescription)
        api.subtask.updateById(currentSubtask.id, inputSubtasksNames[currentSubtask.id])
        setModal(false)
        setModalEditTask(false)
    }

    const handleDeleteTask = (ev) => {
        ev.preventDefault()
        api.task.deleteById(currentTask.id)
        setModal(false)
        setModalDeleteTask(false)
    }

    const handleCloseDeleteTask = (ev) => {
        setModalDeleteTask(false)
    }

    const handleInputSubtaskName = (ev) => {
        const newInputSubtaskName = {
            ...inputSubtasksNames,
            [ev.target.id]: ev.target.value
        }
        setInputSubtasksNames(newInputSubtaskName)
    }

    const handleDeleteSubtask = (ev) => {
        api.subtask.deleteById(ev.target.id)
        console.log(subtasks, 'subtasks')
    }

    const listOfSubtasks = currentTask.subtasks.map((subtask, i) => {
        return (
            <li 
                key={i} 
                className='container-view-task-subtasks-list-subtask' 
                onChange={handleSubtaskForm}
            >
                <input type='checkbox' 
                    id={subtask.title} 
                    name={subtask.title}
                >
                </input>
                <label 
                    htmlFor={subtask.title} 
                    className={subtask.isCompleted ? 'checked' : null}
                >
                    {subtask.title}
                </label>
            </li>
        )
    })

    const inputSubtasks = subtasks.map((subtask, i) => {
        return (
            <li className='container-subtasks-list' key={i}>
                <input 
                    type='text' 
                    id={subtask.id} 
                    name='subtasks' 
                    className='input subtask' 
                    placeholder='e.g. Make Coffee' 
                    value={inputSubtasksNames[subtask.id]}
                    onChange={ev => {handleInputSubtaskName(ev); handleGetCurrentSubtask(ev)}}
                />
                <button title='Delete Subtask' className='button-delete' onClick={handleDeleteSubtask}>
                    <span className='material-symbols-outlined' id={subtask.id}>
                        delete
                    </span>
                </button>
            </li>
        )
    }) 

    return (
        <>
            {modal && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <form className='container-view-task' 
                        onClick={(ev) => {ev.preventDefault()}}>
                        <fieldset className='container-view-task-header'>
                            <h2 className='container-view-task-header-title'>{currentTask.title}</h2>
                            <button title='Edit Task' className='container-view-task-header-more-options-button' onClick={handleClickMoreOptions}>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                            {moreOptions && (
                                <div className='more-options-container'>
                                    <button title='Edit task' className='more-options-container-edit-button' onClick={handleClickEditTask}>
                                        <i className='fa-regular fa-pen-to-square more-options-container-edit-button-icon'></i>
                                        Edit Task
                                    </button>
                                    <button title='Delete task' className='more-options-container-delete-button'
                                        onClick={handleClickDeleteTask}>
                                        <i className='fa-regular fa-trash-can more-options-container-delete-button-icon'></i>
                                        Delete Task
                                    </button>
                                </div>
                            )}
                        </fieldset>
                        <p className='container-view-task-description'>
                            {currentTask.description}
                        </p>
                        <fieldset>
                            <h3 className='container-view-task-title-subtasks'>Subtasks</h3>
                            <ul className='container-view-task-subtasks-list'>
                                    {listOfSubtasks}
                            </ul>
                        </fieldset>
                        <Status
                            currentBoard={currentBoard}
                            columnName={column}
                            handleChangeSelect={ev => setColumn(ev.target.value)}
                        >
                        </Status>
                    </form>
                </div>
            )}

            {modalEditTask && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <Modal 
                        title='Edit Task' 
                        labelTitle='Title'
                        placeholderTitle='e.g. Make Coffee'
                        valueInputTitle={inputTitleTask}
                        labelDescription='Descritpion'
                        placeholderDescription=''
                        valueTextAreaDescription={textAreaDescription} 
                        buttonText='Update Task' 
                        handleClickForm={ev => ev.preventDefault()} 
                        handleInputChange={ev => setInputTitleTask(ev.target.value)} 
                        handleTextAreaChange={ev => setTextAreaDescription(ev.target.value)}
                        handleSubmitClick={updateTask}
                        inputSubtasks={inputSubtasks}
                        valueSubtask={''}
                        handleSubtaskChange={e => console.log('change input default')}
                    >
                    </Modal>
                </div>
            )}

            {modalDeleteTask && (
                <div className='modal' onClick={handleClickCloseModal}>
                    <ModalDelete 
                        title='Delete this task?' 
                        content={`Are you sure you want to delete the "${currentTask.title}" task and its subtasks? This action cannot be reversed.`}
                        handleDeleteClick={handleDeleteTask}
                        handleCancelClick={handleCloseDeleteTask}
                    >
                    </ModalDelete>
                </div>
            )}
        </>
    )
}

export default ModalViewTask