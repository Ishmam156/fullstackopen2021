import React from 'react';
import { Patient, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Entry } from '../types';
import { useStateValue } from "../state";
import AddEntryModal from '../AddEntry';
import { HospitalFormValues } from '../AddEntry/AddHospitalForm';
import { Container, Header, Icon, Card, Button } from "semantic-ui-react";
import axios from "axios";

import { apiBaseUrl } from '../constants';
import { addSinglePatient, addEntry } from '../state/reducer';

const PatientPage = ({ patientid }: { patientid: string }) => {
  const [{ singlepatients, diagnoses }, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HospitalFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientid}/entries`,
        values
      );
      console.log(newEntry);
      dispatch(addEntry(patientid, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {

    if (!singlepatients[patientid]){
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientid}`
        );
        dispatch(addSinglePatient(singlePatient));
      } catch (e) {
        console.error(e);
      }
    }
  };

  void fetchPatient();

}, [dispatch]);

  
if (!singlepatients[patientid]) {
  return (
    <>
        <Container textAlign="left">
          <Header as='h3'>Loading...</Header>
        </Container>
      </>
    );
  }
  
const genderIcon = () => {
    if (singlepatients[patientid].gender === 'male') {
        return <Icon name='mars' />;
    } else if (singlepatients[patientid].gender === 'female') {
        return <Icon name='venus' />;
    } else {
        return <Icon name='genderless' />;
    }
};

const returnDiagnoses = (code: string): string => {
  const foundDiagnoses = diagnoses.find(item => item.code === code);

  if (foundDiagnoses) {
    return foundDiagnoses.name;
  }

  return 'Code not yet defined';
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return(
    <Card fluid key={entry.id}>
      <Card.Content>
        <Header as='h2' content={entry.date} icon='user doctor' />
      </Card.Content>
      <Card.Content>
        <em>{entry.description}</em>
      </Card.Content>
      <Card.Content extra>
        {entry.healthCheckRating === 0 && <Icon name='heart' color='green' />}
        {entry.healthCheckRating === 1 && <Icon name='heart' color='yellow' />}
        {entry.healthCheckRating === 2 && <Icon name='heart' color='red' />}
      </Card.Content>
  </Card>
  );
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return(
    <Card fluid key={entry.id}>
      <Card.Content>
        <Header as='h2' content={entry.date} icon='hospital outline' />
      </Card.Content>
      <Card.Content>
        <em>{entry.description}</em>
      </Card.Content>
      <Card.Content extra>
        <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string) => <li key={code} >{code} {returnDiagnoses(code)}</li>)}
        </ul>
      </Card.Content>
  </Card>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return(
    <Card fluid key={entry.id}>
      <Card.Content>
        <Header as='h2' content={entry.date} icon='stethoscope' />
      </Card.Content>
      <Card.Content>
        <em>{entry.description}</em>
      </Card.Content>
      <Card.Content extra>
        <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string) => <li key={code} >{code} {returnDiagnoses(code)}</li>)}
        </ul>
      </Card.Content>
  </Card>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
  }
};

return (
    <>
        <Container textAlign="left">
            <Header as='h3'>{singlepatients[patientid].name} {genderIcon()}</Header>
            <p>ssn: {singlepatients[patientid].ssn}</p>
            <p>occupation: {singlepatients[patientid].occupation}</p>
            <Header as='h4'>entries</Header>
            {singlepatients[patientid].entries.map(entry => EntryDetails(entry))}
            {singlepatients[patientid].entries.length === 0 && <div>No entries yet.</div>}
            <div>
              <AddEntryModal
                  modalOpen={modalOpen}
                  onSubmit={submitNewEntry}
                  error={error}
                  onClose={closeModal}
                />
              <Button onClick={() => openModal()}>Add a New Hospital Entry</Button>
            </div>
        </Container>
    </>
  );
};

export default PatientPage;