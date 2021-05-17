import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
    type: "ADD_ENTRY";
    payload: {
      id: string,
      data: Entry;
    };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_SINGLE_PATIENT":
        return {
          ...state,
          singlepatients: {
            ...state.singlepatients,
            [action.payload.id]: action.payload
          }
        };
      case "ADD_ENTRY":
        const newEntry = state.singlepatients[action.payload.id];
        newEntry.entries = [ ...newEntry.entries, action.payload.data ];
        return {
          ...state,
          singlepatients: {
            ...state.singlepatients,
            [action.payload.id]: newEntry
          }
        };
      case "ADD_DIAGNOSIS":
        return {
          ...state,
          diagnoses: [
            ...action.payload
          ]
        };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return({
    type: 'SET_PATIENT_LIST',
    payload: data
  });
};

export const addPatient = (data: Patient): Action => {
  return({
    type: 'ADD_PATIENT',
    payload: data
  });
};

export const addSinglePatient = (data: Patient): Action => {
  return({
    type: 'ADD_SINGLE_PATIENT',
    payload: data
  });
};

export const addDiagnosis = (data: Diagnosis[]): Action => {
  return({
    type: 'ADD_DIAGNOSIS',
    payload: data
  });
};

export const addEntry = (id: string, data: Entry): Action => {
  return({
    type: 'ADD_ENTRY',
    payload: {
      id,
      data
    }
  });
};