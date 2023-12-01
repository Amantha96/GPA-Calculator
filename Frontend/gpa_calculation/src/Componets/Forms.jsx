import React, { useState, useEffect } from 'react';
import '../App.css';

const calculateGPA = (marks, credits) => {
  const gp = marks.map((mark, index) => {
    const courseGp = calculateCourseGP(mark);
    return courseGp * credits[index];
  });

  const totGP = gp.reduce((acc, value) => acc + value, 0);
  const totCredits = credits.reduce((acc, value) => acc + value, 0);

  // Error handle division by zero
  const averageGPA = totCredits !== 0 ? totGP / totCredits : 0;

  return averageGPA;
};

const calculateCourseGP = (mark) => {
  if (mark >= 90) return 4.0;
  else if (mark >= 80) return 3.5;
  else if (mark >= 70) return 3.0;
  else if (mark >= 60) return 2.5;
  else if (mark >= 50) return 2.0;
  else if (mark >= 40) return 1.0;
  else return 0;
};

const Forms = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentMarks, setNewStudentMarks] = useState(['', '', '', '', '']);
  const [newStudentCredits, setNewStudentCredits] = useState(['', '', '', '', '']);

  const addStudent = () => {
    const gpa = calculateGPA(
      newStudentMarks.map(mark => parseInt(mark)),
      newStudentCredits.map(credit => parseInt(credit))
    );
    const newStudent = {
      name: newStudentName,
      marks: newStudentMarks.map(mark => parseInt(mark)),
      credits: newStudentCredits.map(credit => parseInt(credit)),
      gpa,
    };
    setStudents([...students, newStudent]);
    
    setNewStudentName('');
    setNewStudentMarks(['', '', '', '', '']);
    setNewStudentCredits(['', '', '', '', '']);
  };

  const removeStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  useEffect(() => {
    
    const sortedStudents = [...students].sort((a, b) => b.gpa - a.gpa);
    setStudents(sortedStudents);
  }, [students]);

  return (
    <div className="app-container">
      <h1>GPA Calculator</h1>
      <div className="form-container">
        <label htmlFor="studentName">Student Name:</label>
        <input
          type="text"
          id="studentName"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <label htmlFor="marks">Subject Marks (Comma-separated):</label>
        <input
          type="text"
          id="marks"
          value={newStudentMarks.join(',')}
          onChange={(e) => setNewStudentMarks(e.target.value.split(','))}
        />
        <label htmlFor="credits">Subject Credits (Comma-separated):</label>
        <input
          type="text"
          id="credits"
          value={newStudentCredits.join(',')}
          onChange={(e) => setNewStudentCredits(e.target.value.split(','))}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <div className="dashboard-container">
        <h2>Student Dashboard</h2>
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>GPA:</strong> {student.gpa.toFixed(2)}</p>
            <p><strong>Marks:</strong> {student.marks.join(', ')}</p>
            <p><strong>Credits:</strong> {student.credits.join(', ')}</p>
            <button onClick={() => removeStudent(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;