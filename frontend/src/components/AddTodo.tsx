import React, { useEffect, useState } from 'react'
import { ITodo } from '../types/todo'

const MAX_NAME_LENGTH = 20

const AddTodo = (props: { saveTodo: (e: React.FormEvent, formData: ITodo) => void }) => {
  const [formData, setFormData] = useState<ITodo>({
    id: '',
    name: '',
    description: '',
    status: false
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(() => false)

  const nameTooLong = formData.name.length > MAX_NAME_LENGTH

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    })
  }

  useEffect(() => {
    setIsDisabled(formData.name === '' || formData.description === '' || nameTooLong)
  }, [formData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.saveTodo(e, formData)
    setFormData({ id: '', name: '', description: '', status: false })
  }

  return (
    <form className="Form" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" name="name" placeholder='Name' value={formData.name} required />
          {nameTooLong && (
            <span style={{ color: 'red', fontSize: '0.75rem' }}>
              名稱最多 {MAX_NAME_LENGTH} 個字元（目前 {formData.name.length}）
            </span>
          )}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" name="description" placeholder='Description' value={formData.description} required />
        </div>
      </div>
      <button disabled={isDisabled}>Add Todo</button>
    </form>
  )
}

export default AddTodo
