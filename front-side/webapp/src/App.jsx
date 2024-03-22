import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/landingpage2.module/LandingPage";
import DashbordLayout from "./pages/dashbord.module/DashbordLayout";
import PatientLayout from "./pages/dashbord.module/components/Patient/PatientLayout";
import {Toaster} from "react-hot-toast";
import Protected from "./components/Protected";
import Logout from "./pages/dashbord.module/components/Logout/Logout";


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
                      <Route path="management"  element={<div>csdsqdsq5</div>} />
                  </Route>
                  <Route path="meets"  element={<div>Rendez vous</div>} />
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
