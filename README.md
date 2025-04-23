# Investment App

A Vite-powered React application that helps you explore and compare investment strategies and plan for financial goals.

## 🚀 Features

- **Investment Simulator**  
  - Up to 5 simultaneous scenarios  
  - Simple or compound interest  
  - Time units: months or years  
  - Capitalization frequency: monthly, bimonthly, quarterly, yearly  
  - Interactive Chart.js line chart for “Total Invested” vs. “Total Value”  

- **Goal Simulator**  
  - **Calculate Monthly Contribution**: find out how much to invest per period to reach a target in a set time  
  - **Calculate Time**: estimate how long it takes to reach a goal with a fixed monthly contribution  

## 📦 Tech Stack

- **Frontend**: React, Vite, React Router  
- **UI**: React Bootstrap, Bootstrap 5  
- **Charts**: Chart.js, react-chartjs-2  
- **Routing**: react-router-dom  

## 🛠️ Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/investment-app.git
   cd investment-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run in development mode**  
   ```bash
   npm run dev
   ```

4. **Open in browser**  
   Visit `http://localhost:5173`

## 🗂️ Project Structure

```
investment-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── pages/
    │   ├── InvestmentPage.jsx
    │   └── GoalPage.jsx
    ├── components/
    │   ├── InvestmentForm.jsx
    │   ├── ResultsChart.jsx
    │   └── GoalCalculator.jsx
    └── utils/
        └── calculator.js
```

## 📈 Usage

- Navigate via the **navbar** between “Investments” and “Goal” simulators.
- In **Investments**:
  1. Fill out one or more scenario forms.
  2. Click **+** to add up to 5 scenarios.
  3. Click **🗑️** on a form to remove it.
  4. Click **Simulate** to update the chart.

- In **Goal**:
  1. Choose mode: calculate contribution or calculate time.
  2. Enter target, initial amount, rate, unit, etc.
  3. Click **Calculate** to see the result.

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m "Add YourFeature"`)  
4. Push to your branch (`git push origin feature/YourFeature`)  
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
