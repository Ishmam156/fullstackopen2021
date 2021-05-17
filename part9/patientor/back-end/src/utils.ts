/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewEntry, newPatient, Gender, Entry, Type, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntries = (param: any): param is Entry[] =>{
  const checkType = param.map((item: { type: string; }) => item.type);
  const possibleValues = ['HealthCheck', 'Hospital', 'OccupationalHealthcare'];

  if (checkType.length === 0) {
    return true;
  } else {
    const finalCheck = checkType.map((type: string) => possibleValues.includes(type));
    if (finalCheck.includes(false)) {
      return false;
    } else {
      return true;
    }
  }
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error('Incorrect or missing entry: ' + entries);
  }
  return entries;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): newPatient => {

  const newEntry: newPatient = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    occupation: parseOccupation(occupation),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    entries: parseEntries(entries),
  };

  return newEntry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Type => {
  return Object.values(Type).includes(param);
};

const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type');
  }

  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing HealthCheckRating');
  }

  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is {
  date: string;
  criteria: string;
} => {
  if (!param.date|| !param.criteria) {
    return false;
  } else {
    return true;
  }
};

const parseDischarge = (discharge: unknown): {
  date: string;
  criteria: string;
} => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  return discharge;
};

const parseEmployerName = (EmployerName: unknown): string => {
  if (!EmployerName || !isString(EmployerName)) {
    throw new Error('Incorrect or missing EmployerName');
  }

  return EmployerName;
};

type EntryFields = { description : unknown, date: unknown, specialist: unknown, type: unknown, healthCheckRating: unknown, discharge: unknown, employerName: unknown };

export const toNewEntry = ( { description, date, specialist, type, healthCheckRating, discharge, employerName }: EntryFields ): NewEntry => {
  
  const newEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseType(type)
  } as NewEntry;
  
  if (newEntry.type === 'HealthCheck') {
    newEntry.healthCheckRating = parseHealthCheckRating(healthCheckRating);
  }
  
  if (newEntry.type === 'Hospital') {
    newEntry.discharge = parseDischarge(discharge);
  }
  
  if (newEntry.type === 'OccupationalHealthcare') {
    newEntry.employerName = parseEmployerName(employerName);
  }

  return newEntry;
};