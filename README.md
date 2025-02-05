# Logout Time Calculator

## Overview
The **Logout Time Calculator** is a React-based web application that helps users determine their logout time based on their completed work hours, completed minutes, and the last punch-in time.

## Features
- User-friendly UI with Material-UI components.
- Input fields for completed hours and minutes.
- TimePicker for selecting the last punch-in time.
- Automatic calculation of the logout time based on an 8-hour 30-minute workday.
- Validation for correct input formats.
- Reset functionality to clear the input fields.
- Responsive design with smooth animations.

## Technologies Used
- React.js
- Material-UI (MUI)
- Day.js (for date and time handling)

## Installation
To set up and run this project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/logout-time-calculator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd logout-time-calculator
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Enter the **completed hours** and **completed minutes**.
2. Select the **last punch-in time** using the TimePicker.
3. Click the **Calculate** button to get the expected logout time.
4. Click **Reset** to clear the inputs and start over.

## Project Structure
```
logout-time-calculator/
│── src/
│   │── components/
│   │   │── App.js       # Main application component
│   │── index.js         # Entry point
│── public/
│── package.json        # Project dependencies and scripts
│── README.md           # Project documentation
```

## Contributing
Feel free to contribute by submitting pull requests or opening issues for bug fixes or enhancements.

## License
This project is licensed under the **MIT License**.
