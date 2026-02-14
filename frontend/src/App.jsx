import { Routes, Route } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import PollPage from "./PollPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePoll />} />
      <Route path="/poll/:id" element={<PollPage />} />
    </Routes>
  );
}

export default App;
