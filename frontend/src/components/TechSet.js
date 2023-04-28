const TechSet = ({ employee }) => {
    const employeeTech = employee.technologies

  return (
      
          <ul>
              {employeeTech.map((tech, index) => (
        <li key={index}>{tech}</li>
      ))}
          </ul>
   
  )
}

export default TechSet