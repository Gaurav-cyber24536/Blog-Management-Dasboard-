import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BlogList from '../pages/BlogList'
import CreateBlog from '../pages/CreateBlog'
import BlogDetails from '../pages/BlogDetails'
import Dashboard from '../pages/Dashboard'

const Routing = () => {
  return (
    <Routes>
         <Route path='/' element={<Dashboard/>}/>
         <Route path='/blogs' element={<BlogList/>}/>
         <Route path='/create' element={<CreateBlog/>}/>
         <Route path='/:id' element={<BlogDetails/>}/>
    </Routes>
  )
}

export default Routing