import React from 'react';

import './App.css';
import LandingPage from "./modules/landingpage2/LandingPage";
import DashbordLayout from "./modules/dashbord/DashbordLayout";
import MedicalFile from "./modules/dashbord/pages/medicalFile/MedicalFile";
import MeetLayout from "./modules/dashbord/pages/meet/Meet";
import Logout from "./modules/dashbord/pages/logout/Logout";
import Protected from "./components/protected/Protected";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MedicalFileStoreProvider} from "./_store/medicalFile.store";
import ConsultationSheets
  from "./modules/dashbord/pages/medicalFile/consultationSheets/ConsultationSheets";
import Home from "./modules/dashbord/pages/home/Home";
import Analyses from "./modules/dashbord/pages/medicalFile/analyses/Analyses";
import Preinscriprion from "./modules/dashbord/pages/medicalFile/preinscriptions/Preinscriptions";
import Patient from "./modules/dashbord/pages/patient/Patient";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="">
            <Route path="" element={<LandingPage/>} />
          </Route>

          <Route path="dashboard" element={<Protected><DashbordLayout/></Protected>} >
            <Route path={""} element={ <Home/> } />
            <Route path="patient" element={<Patient/>} />
            <Route path="medicalfile"  element={<MedicalFile/>} />
            <Route path="medicalfile/:id"  element={<ConsultationSheets/>} />
            <Route path="medicalfile/:medicalId/:sheetNumber"  element={<><Analyses/> <Preinscriprion/> </>} />
            <Route path="meets"  element={<MeetLayout/>} />
            <Route path="stats"  element={<div>Statistiques</div>} />
          </Route>

          <Route path="admin"  element={<div>ADMIN</div>} >
            <Route path=""  element={<div></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
