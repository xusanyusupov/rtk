import React, { useState } from 'react'
import './Hero.scss'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useEditCategoryMutation
} from '../../redux/api/categoryApi'

const Hero = () => {
  const { data, isLoading, isError, error } = useGetCategoryQuery()
  const [createCategory, { isLoading: loadingCreate }] =
    useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [editCategory] = useEditCategoryMutation()

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    email: '',
    password: ''
  })

  const handleCreateEditCategory = e => {
    e.preventDefault()
    if (formData.id) {
      editCategory(formData)
        .unwrap()
        .then(() => {
          setFormData({ id: null, title: '', email: '', password: '' })
        })
        .catch(err => console.log(err))
    } else {
      createCategory(formData)
        .unwrap()
        .then(() => {
          e.target.reset()
          setFormData({ id: null, title: '', email: '', password: '' })
        })
        .catch(err => console.log(err))
    }
  }

  const handleEditCategory = cate => {
    setFormData({
      id: cate.id,
      title: cate.name,
      email: cate.email,
      password: cate.password
    })
  }

  const handleDeleteCategory = id => {
    deleteCategory(id)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
        <button>Go back</button>
      </div>
    )
  }

  return (
    <div className='hero'>
      <form onSubmit={handleCreateEditCategory} className='hero_form' action=''>
        <input
          type='text'
          name='title'
          placeholder='Enter your name'
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button disabled={loadingCreate}>
          {loadingCreate ? 'Loading...' : formData.id ? 'Save' : 'Create'}
        </button>
      </form>

      {isLoading && <p>Loading ....</p>}
      <div className='cards_collection'>
        {data?.map(cate => (
          <div className='category_card' key={cate.id}>
            <h2>Name: {cate.title}</h2>
            <p>Email: {cate.email}</p>
            <h3>Password: {cate.password}</h3>
            <div className='buttons'>
              <button onClick={() => handleDeleteCategory(cate.id)}>
                Delete
              </button>
              <button onClick={() => handleEditCategory(cate)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
