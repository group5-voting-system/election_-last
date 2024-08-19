import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./page/Header"; // قم باستيراد مكون Header
import Home from "./page/Home";

// افترض أنك أنشأت مكون Home
// import Vote from "./Vote"; // افترض أنك أنشأت مكون Vote
// import Apply from "./Apply"; // افترض أنك أنشأت مكون Apply
// import Services from "./Services"; // افترض أنك أنشأت مكون Services
// import Results from "./Results"; // افترض أنك أنشأت مكون Results
// import Contact from "./Contact"; // افترض أنك أنشأت مكون Contact
import PartyCandidatesRequestForm from "./CandidatesRequest.jsx";
import PaymentComponent from "./payment/payment.jsx";
import LocalListForm from "./CandidatesRequest.jsx";
import ArabicGrid from "./cities";
import "./App.css";
import ElectionCircleSelection from "./listtype";
import VotingCandidatesGrid from "./local_voting.jsx";
import Voting from "./local_votes.jsx";
import VotingSystem from "./VotingSystem.jsx";
import PartyListForm from "./PartyListForm.jsx";
import Results from "./results.jsx";
import PartyListVoting from "./PartyListVoting.jsx";
import News from "./news.jsx";
function App() {
  return (
    <Router>
      <Header />

      {/* <LocalListForm /> */}
      {/* <PartyListForm /> */}
      {/* <Results /> */}
      {/* <News /> */}
      <PartyListVoting />
      <ElectionCircleSelection />
      <VotingSystem />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/area" element={<ArabicGrid />} />
        <Route path="/type" element={<ElectionCircleSelection />} />
        <Route path="/localVote" element={<VotingSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
