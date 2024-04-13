import React from 'react'
import Teacher from './Teacher'
import { TeacherProvider } from '../../context/TeacherContext'


function index() {
  return (
    <>
    <TeacherProvider>
        <Teacher/>
    </TeacherProvider>
    </>
  )
}

export default index