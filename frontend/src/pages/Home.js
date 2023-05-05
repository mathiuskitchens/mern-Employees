import { useEffect } from 'react';
import { useEmployeesContext } from '../hooks/useEmployeesContext';

// components
import EmployeeDetails from '../components/EmployeeDetails';
import EmployeeForm from '../components/EmployeeForm';

const Home = () => {
  const { employees, dispatch } = useEmployeesContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EMPLOYEES', payload: json });
      }
    };
    fetchEmployees();

    // eslint-disable-next-line
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
