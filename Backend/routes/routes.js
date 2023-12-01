const express = require('express');
const router = express.Router();

const posts = require('../models/student');

router.post('/students/save', async (req, res) => {

    try {
        const { name, marks,credits } = req.body;
        const gpa = calculateGPA(marks, credits);


        const newStudent = new Student({ name, marks,credits, gpa })
        await newStudent.save();

        res.json(newStudent);

    } catch (error) {

        console.error('Error saving student', error);
        return res.status(400).json({
            message: error.message

        });

    }
});



function calculateGPA(marks, credits) {
    const gp = marks.map((mark, index) => {
        const courseGp = calculateCourseGP(mark);
        return courseGp * credits[index];
    });

    const totGP = gp.reduce((acc, value) => acc + value, 0)
    const totcredits = credits.reduce((acc, value) => acc + value, 0);

    //error hadle division by zero

    const averageGPA = totcredits !== 0 ? totGP / totcredits : 0;

    return averageGPA;

}

function calculateCourseGP(mark) {

    if (marks >= 90) return 4.0;
    else if (mark >= 80) return 3.5;
    else if (mark >= 70) return 3.0;
    else if (mark >= 60) return 2.5;
    else if (mark >= 50) return 2.0;
    else if (mark >= 40) return 1.0;

    else return 0;

}

router.get('/api/students/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Get all students

  router.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find().sort({ gpa: -1 });
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


// Update student

router.put('/students/:id', async (req, res) => {
    try {
      const { name, marks, credits } = req.body;
      const gpa = calculateGPA(marks, credits);
  
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { name, marks, credits, gpa },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete student

  router.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });