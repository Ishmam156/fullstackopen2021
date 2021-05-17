import patients from '../../data/patients';
import { NewEntry, newPatient, Patient, NonSensitivePatientEntry } from '../types';
import {v1 as uuid} from 'uuid';


const getAll = (): Patient[] => {
    return patients;
};

const getAllNonSensitive = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient: Patient | undefined =  patients.find(patient => patient.id === id);

    if (patient) {
        const PatientEntry = { ...patient };
        return PatientEntry;
    } else {
        return patient;
    }
    
};

const addPatient = (entry: newPatient): Patient => {

    const newPatient: Patient = {
        id: uuid(), 
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): NewEntry => {

    const newEntry = {
        id: uuid(),
        ...entry
    };

    const patient = patients.find(patient => patient.id === id);

    if (patient) {
        patient.entries = [ ...patient.entries, newEntry ];
    }

    return newEntry;
};

export default ({
    getAll,
    getAllNonSensitive,
    addPatient,
    getPatientById,
    addEntry
});