import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LadingPageLayout from "./pages/landingpage.module/LadingPageLayout";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path=""  element={<LadingPageLayout/>} >
                  <Route path="login"  element={<div>csdsqdsq5</div>} />
              </Route>

              <Route path="dashboard"  element={<div>cc</div>} >
                  <Route path="patients"  element={<div></div>} />
                  <Route path="appointments"  element={<div>csdsqdsq5</div>} />
                  <Route path="statistics"  element={<div>csdsqdsq5</div>} />
              </Route>

              <Route path="admin"  element={<div>ADMIN</div>} >
                  <Route path=""  element={<div></div>} />
              </Route>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
