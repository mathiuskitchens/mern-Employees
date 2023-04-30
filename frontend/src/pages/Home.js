import { useEffect, useState } from 'react';

// components
import EmployeeDetails from "../components/EmployeeDetails"
import EmployeeForm from '../components/EmployeeForm';

const Home = () => {
  // initialize useState
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const json = await response.json();

      if (response.ok) {
        setEmployees(json);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="home">
      <div className="employees">
        {employees &&
          employees.map((employee) => (
            <EmployeeDetails key={employee._id} employee={employee} />
          
          ))}
      </div>
      <EmployeeForm />
    </div>
  );
};

export default Home;
