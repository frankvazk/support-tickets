import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewTicket from "./pages/NewTicket";
import Protect from "./components/Protect";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/new-ticket"
              element={
                <Protect>
                  <NewTicket />
                </Protect>
              }
            />
            <Route
              path="/tickets"
              element={
                <Protect>
                  <Tickets />
                </Protect>
              }
            />
            <Route
              path="/ticket/:id"
              element={
                <Protect>
                  <Ticket />
                </Protect>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
