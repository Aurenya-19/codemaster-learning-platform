const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const TEMP_DIR = path.join(__dirname, '../temp');
const TIMEOUT = parseInt(process.env.EXECUTION_TIMEOUT) || 5000;

// Ensure temp directory exists
(async () => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create temp directory:', err);
  }
})();

// Execute Python code
async function executePython(code, input = '', testCases = []) {
  const fileId = crypto.randomBytes(16).toString('hex');
  const filePath = path.join(TEMP_DIR, `${fileId}.py`);

  try {
    // Write code to file
    await fs.writeFile(filePath, code);

    // Execute code
    const result = await runCommand(
      `python3 ${filePath}`,
      input,
      TIMEOUT
    );

    // Run test cases if provided
    let testResults = [];
    if (testCases.length > 0) {
      testResults = await runTestCases(
        `python3 ${filePath}`,
        testCases
      );
    }

    return {
      success: result.exitCode === 0,
      output: result.stdout,
      error: result.stderr,
      executionTime: result.executionTime,
      testResults
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: '',
      executionTime: 0
    };
  } finally {
    // Cleanup
    try {
      await fs.unlink(filePath);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// Execute C++ code
async function executeCpp(code, input = '', testCases = []) {
  const fileId = crypto.randomBytes(16).toString('hex');
  const sourceFile = path.join(TEMP_DIR, `${fileId}.cpp`);
  const execFile = path.join(TEMP_DIR, fileId);

  try {
    // Write code to file
    await fs.writeFile(sourceFile, code);

    // Compile
    const compileResult = await runCommand(
      `g++ -std=c++17 -o ${execFile} ${sourceFile}`,
      '',
      TIMEOUT
    );

    if (compileResult.exitCode !== 0) {
      return {
        success: false,
        error: 'Compilation failed',
        output: compileResult.stderr,
        executionTime: 0
      };
    }

    // Execute
    const result = await runCommand(
      execFile,
      input,
      TIMEOUT
    );

    // Run test cases if provided
    let testResults = [];
    if (testCases.length > 0) {
      testResults = await runTestCases(execFile, testCases);
    }

    return {
      success: result.exitCode === 0,
      output: result.stdout,
      error: result.stderr,
      executionTime: result.executionTime,
      testResults
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: '',
      executionTime: 0
    };
  } finally {
    // Cleanup
    try {
      await fs.unlink(sourceFile);
      await fs.unlink(execFile);
    } catch (err) {
      // Ignore cleanup errors
    }
  }
}

// Run command with timeout
function runCommand(command, input, timeout) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const process = exec(command, {
      timeout,
      maxBuffer: 1024 * 1024 // 1MB
    }, (error, stdout, stderr) => {
      const executionTime = Date.now() - startTime;

      if (error && error.killed) {
        resolve({
          exitCode: -1,
          stdout: '',
          stderr: 'Execution timeout exceeded',
          executionTime: timeout
        });
      } else {
        resolve({
          exitCode: error ? error.code : 0,
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          executionTime
        });
      }
    });

    // Send input if provided
    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
}

// Run test cases
async function runTestCases(command, testCases) {
  const results = [];

  for (const testCase of testCases) {
    const result = await runCommand(
      command,
      testCase.input,
      TIMEOUT
    );

    const passed = result.stdout === testCase.expectedOutput.trim();
    
    results.push({
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.stdout,
      passed,
      executionTime: result.executionTime
    });
  }

  return results;
}

module.exports = {
  executePython,
  executeCpp
};
