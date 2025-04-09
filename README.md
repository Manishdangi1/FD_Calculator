A Fixed Deposit (FD) Calculator that helps users estimate the maturity amount of their fixed deposit investment based on:

 >>Principal Amount (initial investment)

 >>Interest Rate (annual %)

 >>Tenure (time period in years/months)

 >>Compounding Frequency (monthly, quarterly, annually, etc.)

This app is optimized for the following test cases 

1.Input Validation

.Non-numeric inputs
.Negative values
.Zero values
.Empty fields
.Extremely large values that might cause overflow
.Interest rate bounds (0-100%)

2.Calculation Edge Cases

.Very small principal amounts
.Very high interest rates
.Very long time periods (decades)
.Different compounding frequencies
.Fractional years (e.g., 1.5 years)

3.Mathematical Edge Cases

.Preventing floating point precision errors
.Handling very large exponents with logarithms
.Proper rounding of results
