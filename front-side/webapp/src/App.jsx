import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./modules/landingpage2/LandingPage";
import DashbordLayout from "./modules/dashbord/DashbordLayout";
import PatientLayout from "./modules/dashbord/components/Patient/PatientLayout";
import {Toaster} from "react-hot-toast";
import Protected from "./components/Protected/Protected";
import Logout from "./modules/dashbord/components/Logout/Logout";
import MedicalFile from "./modules/dashbord/components/Patient/components/MedicalFile/MedicalFile";
import MeetLayout from "./modules/dashbord/components/Meet/MeetLayout";
function App() {
  return (
      <>
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
                  </Route>
                  <Route path="meets"  element={<MeetLayout/>} />
                  <Route path="forms" element={<PatientLayout/>} >
                      <Route path="management"  element={<div>En cours</div>} />
                      <Route path="medicalfile"  element={<MedicalFile/>} />
                  </Route>
                  <Route path="stats"  element={<div>Statistiques</div>} />
                  <Route path="logout"  element={<Logout/>} />
              </Route>
              <Route path="admin"  element={<div>ADMIN</div>} >
                  <Route path=""  element={<div></div>} />
              </Route>
          </Routes>
      </BrowserRouter>
      </>
  );
}
export default App;
