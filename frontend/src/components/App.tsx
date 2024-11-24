import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Aiask from "./AiaskPost";
import ShellRoute from "../ShellRoute";
import Quiz from "./Quiz";

function App() {
    const isLoggedIn = !!localStorage.getItem('userid');

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />

            <Route element={<ShellRoute />}>
                <Route
                    path="/"
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                />
                <Route path="/aiask/post" element={<Aiask />} />
                <Route path="/aiask/writing" element={<Aiask />} />
                <Route path="/aiask/:id" element={<Aiask />} />
            </Route>
        </Routes>
    );
}

export default App;
