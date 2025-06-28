import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/chat" element={<div>Chat</div>} />
    </Routes>
  );
}

export default App;
