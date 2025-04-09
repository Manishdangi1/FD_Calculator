import React, { useState, useEffect } from "react";

const FixedDepositCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [errors, setErrors] = useState({
    principal: "",
    rate: "",
    time: ""
  });
  const [isCalculated, setIsCalculated] = useState(false);

  // Validate inputs on change
  useEffect(() => {
    const newErrors = {};
    
    if (principal && (isNaN(principal) || parseFloat(principal) <= 0)) {
      newErrors.principal = "Principal must be a positive number";
    }
    
    if (rate && (isNaN(rate) || parseFloat(rate) <= 0 || parseFloat(rate) > 100)) {
      newErrors.rate = "Rate must be between 0 and 100";
    }
    
    if (time && (isNaN(time) || parseFloat(time) <= 0)) {
      newErrors.time = "Time must be a positive number";
    }
    
    setErrors(newErrors);
  }, [principal, rate, time]);

  const calculateFD = () => {
    // Check for empty fields
    if (!principal || !rate || !time) {
      const newErrors = {};
      if (!principal) newErrors.principal = "Principal is required";
      if (!rate) newErrors.rate = "Rate is required";
      if (!time) newErrors.time = "Time is required";
      setErrors(newErrors);
      return;
    }

    // Check for validation errors
    if (Object.keys(errors).some(key => errors[key])) {
      return;
    }

    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const n = parseInt(frequency);

    // Handle very large numbers that might cause overflow
    try {
      const exponent = n * T;
      const base = 1 + R / n;
      
      // For very large exponents, use logarithms to prevent overflow
      let A;
      if (exponent > 1000) {
        A = P * Math.exp(exponent * Math.log(base));
      } else { 
        A = P * Math.pow(base, exponent);
      }
      
      setMaturityAmount(A.toFixed(2));
      setIsCalculated(true);
    } catch  {
       
      setMaturityAmount("Error in calculation");
    }
  };

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setFrequency("1");
    setMaturityAmount(null);
    setErrors({
      principal: "",
      rate: "",
      time: ""
    });
    setIsCalculated(false);
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">FD Calculator</h2>

      <div className="form-group">
        <div className="input-container">
          <input
            type="number"
            placeholder="Principal Amount (₹)"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className={`input-field ${errors.principal ? "error" : ""}`}
            min="1"
            step="any"
          />
          {errors.principal && <span className="error-message">{errors.principal}</span>}
        </div>

        <div className="input-container">
          <input
            type="number"
            placeholder="Annual Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={`input-field ${errors.rate ? "error" : ""}`}
            min="0.01"
            max="100"
            step="any"
          />
          {errors.rate && <span className="error-message">{errors.rate}</span>}
        </div>

        <div className="input-container">
          <input
            type="number"
            placeholder="Time (in years)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`input-field ${errors.time ? "error" : ""}`}
            min="0.01"
            step="any"
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>

        <div className="input-container">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="input-field"
          >
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>

        <div className="button-group">
          <button onClick={calculateFD} className="calculate-button">
            Calculate
          </button>
          <button onClick={resetCalculator} className="reset-button">
            Reset
          </button>
        </div>

        {isCalculated && maturityAmount && !isNaN(maturityAmount) && (
          <div className="result">
            <p className="result-label">Maturity Amount:</p>
            <p className="result-value">₹ {Number(maturityAmount).toLocaleString('en-IN')}</p>
            <div className="breakdown">
              <p>Principal: ₹ {Number(principal).toLocaleString('en-IN')}</p>
              <p>Interest Earned: ₹ {(maturityAmount - principal).toFixed(2).toLocaleString('en-IN')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedDepositCalculator;