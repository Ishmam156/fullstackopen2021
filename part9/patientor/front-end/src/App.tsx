import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";
import { setPatientList, addDiagnosis } from '../src/state/reducer';

import PatientListPage from "./PatientListPage";
import SinglePatient from './components/SinglePatient';

const App = () => {
  
  const [, dispatch] = useStateValue();
  
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
        
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(addDiagnosis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();

  }, [dispatch]);

  const PatientFind = () => {

    const { id } = useParams<{ id: string }>();
    return <SinglePatient patientid={id} />;
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientFind />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
