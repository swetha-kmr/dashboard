import { 
  HashRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  // Define RequireAuth component inside App
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <HashRouter future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          
          {/* Users Routes */}
          <Route 
            path="/users" 
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            } 
          />
          <Route 
            path="/users/:orderId" 
            element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            } 
          />
          <Route 
            path="/users/new" 
            element={
              <RequireAuth>
                <New inputs={userInputs} title="Add New User" />
              </RequireAuth>
            } 
          />
          
          {/* Products Routes */}
          <Route 
            path="/products" 
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            } 
          />
          <Route 
            path="/products/:orderId" 
            element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            } 
          />
          <Route 
            path="/products/new" 
            element={
              <RequireAuth>
                <New inputs={productInputs} title="Add New Product" />
              </RequireAuth>
            } 
          />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
