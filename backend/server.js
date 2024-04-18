const express = require('express');
const cors = require('cors'); // Import the cors module
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes'); 
const homeworkRoutes = require('./routes/homeworkRoutes'); 



connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true, // enable credentials if necessary
	})
);

app.use('/api/users',cors(), userRoutes);
app.use('/api/teachers', cors(), teacherRoutes);
app.use('/api/students', cors(), studentRoutes);
app.use('/api/courses', cors(), courseRoutes); // Mount course routes
app.use('/api/payment', cors(), paymentRoutes);
app.use('/api/homework', cors(), homeworkRoutes);

  
  
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
