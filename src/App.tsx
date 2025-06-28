import { Routes, Route } from "react-router-dom";
import Home from "./route/Home";
import Chat from "./route/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
