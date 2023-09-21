import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvide } from "./contexts/AuthProvide";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import PrivateRout from "./components/authentication/PrivateRout";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Logout from "./components/authentication/Logout";
import UpdateProfile from "./components/authentication/UpdateProfile";
import Profile from "./components/Profile";
import Dashboard from "./components/google-drive/DashBoard";



function App() {
  return (
    <AuthProvide>
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/user"
                element={
                  <PrivateRout>
                    <Profile/>
                    </PrivateRout>
                }
                />
                <Route exact path="/"
                element={
                  <PrivateRout>
                    <Dashboard/>
                    </PrivateRout>
                }
                />
                <Route exact path="/folders/:folderId"
                element={
                  <PrivateRout>
                    <Dashboard/>
                    </PrivateRout>
                }
                />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/update-profile" element={<PrivateRout>
                    <UpdateProfile/>
                    </PrivateRout>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </Router>
    </AuthProvide>
  );
}

export default App;
