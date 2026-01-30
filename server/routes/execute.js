const express = require('express');
const router = express.Router();
const { executePython, executeCpp } = require('../executors/codeExecutor');

// Execute Python code
router.post('/python', async (req, res) => {
  try {
    const { code, input = '', testCases = [] } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = await executePython(code, input, testCases);
    res.json(result);
  } catch (error) {
    console.error('Python execution error:', error);
    res.status(500).json({ 
      error: 'Execution failed', 
      message: error.message 
    });
  }
});

// Execute C++ code
router.post('/cpp', async (req, res) => {
  try {
    const { code, input = '', testCases = [] } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = await executeCpp(code, input, testCases);
    res.json(result);
  } catch (error) {
    console.error('C++ execution error:', error);
    res.status(500).json({ 
      error: 'Execution failed', 
      message: error.message 
    });
  }
});

module.exports = router;
