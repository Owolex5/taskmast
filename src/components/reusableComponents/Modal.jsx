import '../../styles/reusableComponents/Modal.scss'
import MainButton from '../reusableComponents/MainButton'
import Status from './Status'
import FieldsetInput from './FieldsetInput'

const Modal = ({title, labelTitle, placeholderTitle, valueInputTitle, labelDescription, placeholderDescription, buttonText, handleClickForm, handleInputChange, valueTextAreaDescription, handleTextAreaChange}) => {
    
    return (
        <div className='container-view-task'>
            <form className='modal-form' onClick={handleClickForm}>
                <h2 className='modal-form-title'>{title}</h2>
                <fieldset className='modal-form-fieldset-title fieldset'>
                    <label htmlFor='title' className='label'>{labelTitle}</label>
                    <input type='text' id='title' name='title' className='input' placeholder={placeholderTitle} value={valueInputTitle} onChange={handleInputChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='description' className='label'>{labelDescription}</label>
                    <textarea type='text' id='description' name='description' className='textarea' placeholder={placeholderDescription} value={valueTextAreaDescription} onChange={handleTextAreaChange}>
                    </textarea>
                </fieldset>
                <FieldsetInput
                labelSubtasks='Subtasks'
                placeholderSubtask='e.g. Make Coffee'
                secondPlaceholderSubtask='e.g. Drink coffee & smile'
                titleIcon='Delete Subtask'
                buttonText='Add New Subtask'>
                </FieldsetInput>
                <Status></Status>
                <MainButton value={buttonText}></MainButton>
            </form>
        </div>
    )
}

export default Modal