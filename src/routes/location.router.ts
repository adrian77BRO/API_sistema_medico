import express from 'express';
import {
    getAllStatesController,
    getTownsByStateController,
} from '../controllers/location.controller';

const locationRouter = express.Router();

locationRouter.get('/', getAllStatesController);
locationRouter.get('/:estado', getTownsByStateController);

export default locationRouter;