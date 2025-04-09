import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import FixedDepositCalculator from "./components/FdCalculator";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FixedDepositCalculator />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<App />)
export default App;
