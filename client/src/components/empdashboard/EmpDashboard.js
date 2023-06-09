import React, { useEffect, useState } from 'react';

const EmpDashboard = () => {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  useEffect(() => {
    // Simulating authentication and data retrieval
    const authenticateUser = () => {
      // Replace this with your authentication logic
      const isAuthenticated = true; // Set to true if user is authenticated
      if (isAuthenticated) {
        // Replace this with your data retrieval logic
        const employeeData = {
          name: 'Manikanta',
          position: 'Developer',
          performance: 'Excellent',
        };
        setLoggedInEmployee(employeeData);
      }
    };

    // Simulating async authentication and data retrieval process
    const delay = setTimeout(() => {
      authenticateUser();
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (!loggedInEmployee) {
    // Render null or loading indicator while authenticating and retrieving data
    return null;
  }

  // Unique CSS styles for the employee dashboard
  const styles = `
    .dashboard {
      background-color: #f2f2f2;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .employee-card {
      background-color: #fff;
      padding: 20px;
      margin-bottom: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .employee-card h3 {
      color: #333;
      margin: 0;
    }

    .employee-card p {
      color: #888;
      margin: 0;
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: 10px;
      }

      .employee-card {
        padding: 10px;
      }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="dashboard">
        <div className="employee-card">
          <h3>{loggedInEmployee.name}</h3>
          <p>Position: {loggedInEmployee.position}</p>
          <p>Performance: {loggedInEmployee.performance}</p>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
