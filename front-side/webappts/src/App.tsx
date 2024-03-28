import React from 'react';

import './App.css';
import LandingPage from "./modules/landingpage2/LandingPage";
import PatientLayout from "./modules/dashbord/pages/patient/PatientLayout";
import DashbordLayout from "./modules/dashbord/DashbordLayout";
import MedicalFile from "./modules/dashbord/pages/patient/components/MedicalFile/MedicalFile";
import MeetLayout from "./modules/dashbord/pages/meet/MeetLayout";
import Logout from "./modules/dashbord/pages/logout/Logout";
import Protected from "./components/protected/Protected";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MedicalFileStoreProvider} from "./_store/medicalFile.store";
import ConsultationSheets
  from "./modules/dashbord/pages/patient/components/MedicalFile/ConsultationSheets/ConsultationSheets";

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
            <Route path="patient" element={<PatientLayout/>} >
              <Route path="management"  element={<div>En cours</div>} />
              <Route path="medicalfile"  element={<MedicalFile/>} />
              <Route path="medicalfile/:id"  element={<MedicalFileStoreProvider><ConsultationSheets/></MedicalFileStoreProvider>} />
            </Route>
            <Route path="meets"  element={<MeetLayout/>} />
            <Route path="forms" element={<><PatientLayout/></>} >
              <Route path="management"  element={<div>En cours</div>} />
              <Route path="medicalfile"  element={<> <MedicalFile/> </>} />
            </Route>
            <Route path="stats"  element={<div>Statistiques</div>} />
            <Route path="logout"  element={<Logout/>} />
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
