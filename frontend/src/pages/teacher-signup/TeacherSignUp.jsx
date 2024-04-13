import React, { useState } from 'react';
import { useTeacherContext } from '../../context/TeacherContext';

const TeacherSignUp = () => {
  const { teacherRegister } = useTeacherContext();
  const [formData, setFormData] = useState({
    teacherName: '',
    teacherEmail: '',
    teacherPassword: '',
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      profilePic: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Teacher Name:', formData.teacherName);
  console.log('Teacher Email:', formData.teacherEmail);
  console.log('Teacher Password:', formData.teacherPassword);
  console.log('Profile Picture:', formData.profilePic);
    const formDataToSend = new FormData();
    formDataToSend.append('teacherName', formData.teacherName);
    formDataToSend.append('teacherEmail', formData.teacherEmail);
    formDataToSend.append('teacherPassword', formData.teacherPassword);
    formDataToSend.append('profilePic', formData.profilePic);
   
    teacherRegister(formDataToSend);

    setFormData({
      teacherName: '',
      teacherEmail: '',
      teacherPassword: '',
      profilePic: null,
    });
  };
  

  return (

    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Teacher SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teacherName" className="block text-gray-700 font-semibold">Teacher Name:</label>
          <input type="text" name="teacherName" id="teacherName" value={formData.teacherName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="teacherEmail" className="block text-gray-700 font-semibold">teacherEmail:</label>
          <input type="teacherEmail" name="teacherEmail" id="teacherEmail" value={formData.teacherEmail} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <div className="mb-4">
          <label htmlFor="teacherPassword" className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="teacherPassword"
            name="teacherPassword"
            value={formData.teacherPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700 font-semibold">Marketing Slip:</label>
          <input type="file" name="profilePic" id="profilePic" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div> */}
        <div className="mb-4">
          <label htmlFor="slipImage" className="block text-gray-700 font-semibold">Marketing Slip:</label>
          <input type="file" name="slipImage" id="slipImage" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Create Camp</button>
      </form>
    </div>
    
  );
};

export default TeacherSignUp;
