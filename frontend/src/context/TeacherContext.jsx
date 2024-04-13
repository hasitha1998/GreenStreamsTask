import React, { createContext, useContext, useState } from 'react';
import TeacherAPI from './api/teacherApi';

const TeacherContext = createContext();

export const useTeacherContext = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState({
    teacherName: "",
    teacherEmail: "",
    teacherPassword: "",
    profilePic: "",
  });

  const teacherLogin = async (email, password) => {
    try {
      const response = await TeacherAPI.login(email, password);
      setTeacher(response.data);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const teacherRegister = async (teacherData) => {
    try {
      const response = await TeacherAPI.register(teacherData);
      setTeachers([...teachers, response.data]);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await TeacherAPI.getAll();
      setTeachers(response.data);
      console.log('Teachers fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const getOneTeacher = async (id) => {
    try {
      const response = await TeacherAPI.getOne(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher:', error);
      return null;
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await TeacherAPI.delete(id);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      console.log('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
  
    <TeacherContext.Provider value={{ teachers, teacherLogin, getAllTeachers, getOneTeacher, deleteTeacher, teacher, setTeacher , teacherRegister}}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext;
