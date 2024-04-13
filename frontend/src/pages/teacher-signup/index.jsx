import React from 'react'
import { TeacherProvider } from '../../context/TeacherContext'
import TeacherSignUp from './TeacherSignUp'


function index() {
  return (
    <>
    <TeacherProvider>
        <TeacherSignUp/>
    </TeacherProvider>
    </>
  )
}

export default index