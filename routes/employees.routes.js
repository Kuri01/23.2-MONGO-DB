const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Employee = require('../models/employees.routes');

// exp = expected element

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random * count);
    const exp = await Employee.findById().skip(rand);
    if (!exp) res.status(500).json({ message: 'not found' });
    else res.json(exp);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const exp = Employee.findById(req.params.id);
    if (!exp) res.status(404).json({ message: 'not found' });
    else res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = new Employee({ name });
    await newEmployee.save();
    res.json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const exp = await Employee.findById(req.params.id);
    if (exp) {
      exp.firstName = firstName;
      exp.lastName = lastName;
      exp.department = department;
      await exp.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const exp = await Employee.findById(req.params.id);
    if (exp) {
      exp.remove();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
