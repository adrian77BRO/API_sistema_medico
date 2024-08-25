import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router';
import patientRouter from './routes/patient.router';
import appointmentRouter from './routes/appointment.router';
import { db } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', userRouter);
app.use('/pacientes', patientRouter);
app.use('/citas', appointmentRouter)

const PORT = process.env.PORT || 4000;

db.getConnection()
    .then(() => {
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });