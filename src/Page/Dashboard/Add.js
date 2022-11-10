import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

function Add({ employees, setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [overtime, setOvertime] = useState('');
  const [deductions, setDeductions] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [date, setDate] = useState('');

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  useEffect(() => {
    let deductMoneyPerHour = 100;
    let overTimeMoneyPerHour = 200;
    let netSalary =
      baseSalary -
      deductions * deductMoneyPerHour +
      overtime * overTimeMoneyPerHour;
    setSalary(netSalary);

  }, [ overtime, deductions, baseSalary ]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };
    employees.push(newEmployee);
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          disabled
        />
        <label htmlFor="salary">Base Salary ($)</label>
        <input
          id="baseSalary"
          type="number"
          name="baseSalary"
          value={baseSalary}
          onChange={(e) => setBaseSalary(e.target.value)}
        />
        <label htmlFor="salary">Over Time (hour)</label>
        <input
          id="overtime"
          type="number"
          name="overtime"
          value={overtime}
          onChange={(e) => setOvertime(e.target.value)}
        />
        <label htmlFor="salary">Deduction (hour)</label>
        <input
          id="deduction"
          type="number"
          name="deduction"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
