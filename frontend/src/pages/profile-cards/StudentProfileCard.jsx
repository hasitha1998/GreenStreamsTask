import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

function StudentProfileCard({ studentName, studentEmail, profilePic }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={studentName} src={profilePic} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{studentName}</Typography>
            <Typography variant="subtitle1">{studentEmail}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StudentProfileCard;
