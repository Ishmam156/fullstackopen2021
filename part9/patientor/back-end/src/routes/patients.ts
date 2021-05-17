import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/:id/entries', (req, res) => {
  try {
    const parsedEntry = toNewEntry(req.body);
    const newEntry = patientService.addEntry(req.params.id, parsedEntry);

    res.json(newEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const parsedEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(parsedEntry);

    res.json(newPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;