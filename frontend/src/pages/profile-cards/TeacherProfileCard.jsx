import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material'; // Assuming you have the Logout icon imported

const TeacherProfileCard = ({ teacherName, teacherEmail, profilePic }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={profilePic} alt={teacherName} />
        }
        title={teacherName}
        subheader={teacherEmail}
      />
      
    </Card>
  );
};

export default TeacherProfileCard;
