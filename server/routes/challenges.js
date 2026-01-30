const express = require('express');
const router = express.Router();

// Sample challenges data (in production, this would come from database)
const challenges = {
  python: [
    {
      id: 'py-001',
      title: 'Two Sum',
      difficulty: 'easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
      starterCode: 'def two_sum(nums, target):\n    # Write your code here\n    pass\n\n# Test\nnums = [2, 7, 11, 15]\ntarget = 9\nprint(two_sum(nums, target))',
      testCases: [
        { input: '[2,7,11,15]\n9', expectedOutput: '[0, 1]' },
        { input: '[3,2,4]\n6', expectedOutput: '[1, 2]' }
      ],
      hints: [
        'Try using a hash map to store numbers you\'ve seen',
        'For each number, check if target - number exists in the map'
      ],
      points: 50
    },
    {
      id: 'py-002',
      title: 'Reverse String',
      difficulty: 'easy',
      description: 'Write a function that reverses a string.',
      starterCode: 'def reverse_string(s):\n    # Write your code here\n    pass\n\n# Test\nprint(reverse_string("hello"))',
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'world', expectedOutput: 'dlrow' }
      ],
      hints: [
        'You can use string slicing',
        'Try s[::-1]'
      ],
      points: 30
    },
    {
      id: 'py-003',
      title: 'Binary Search',
      difficulty: 'medium',
      description: 'Implement binary search algorithm.',
      starterCode: 'def binary_search(arr, target):\n    # Write your code here\n    pass\n\n# Test\narr = [1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(binary_search(arr, 5))',
      testCases: [
        { input: '[1,2,3,4,5]\n3', expectedOutput: '2' },
        { input: '[1,2,3,4,5]\n6', expectedOutput: '-1' }
      ],
      hints: [
        'Use two pointers: left and right',
        'Compare middle element with target'
      ],
      points: 100
    }
  ],
  cpp: [
    {
      id: 'cpp-001',
      title: 'Swap Two Numbers',
      difficulty: 'easy',
      description: 'Write a function to swap two numbers using pointers.',
      starterCode: '#include <iostream>\nusing namespace std;\n\nvoid swap(int* a, int* b) {\n    // Write your code here\n}\n\nint main() {\n    int x = 5, y = 10;\n    swap(&x, &y);\n    cout << x << " " << y << endl;\n    return 0;\n}',
      testCases: [
        { input: '', expectedOutput: '10 5' }
      ],
      hints: [
        'Use a temporary variable',
        'Or use XOR swap trick'
      ],
      points: 40
    },
    {
      id: 'cpp-002',
      title: 'Linked List Implementation',
      difficulty: 'medium',
      description: 'Implement a singly linked list with insert and display functions.',
      starterCode: '#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n};\n\nclass LinkedList {\npublic:\n    Node* head;\n    \n    LinkedList() : head(nullptr) {}\n    \n    void insert(int value) {\n        // Write your code here\n    }\n    \n    void display() {\n        // Write your code here\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insert(1);\n    list.insert(2);\n    list.insert(3);\n    list.display();\n    return 0;\n}',
      testCases: [
        { input: '', expectedOutput: '1 2 3' }
      ],
      hints: [
        'Create new node with given value',
        'Link it to the existing list'
      ],
      points: 150
    },
    {
      id: 'cpp-003',
      title: 'State Machine - Traffic Light',
      difficulty: 'hard',
      description: 'Implement a finite state machine for a traffic light system.',
      starterCode: '#include <iostream>\nusing namespace std;\n\nenum State { RED, YELLOW, GREEN };\n\nclass TrafficLight {\nprivate:\n    State currentState;\n    \npublic:\n    TrafficLight() : currentState(RED) {}\n    \n    void transition() {\n        // Implement state transitions\n    }\n    \n    void display() {\n        // Display current state\n    }\n};\n\nint main() {\n    TrafficLight light;\n    for(int i = 0; i < 6; i++) {\n        light.display();\n        light.transition();\n    }\n    return 0;\n}',
      testCases: [
        { input: '', expectedOutput: 'RED\nGREEN\nYELLOW\nRED\nGREEN\nYELLOW' }
      ],
      hints: [
        'Use switch statement for state transitions',
        'RED -> GREEN -> YELLOW -> RED'
      ],
      points: 300
    }
  ]
};

// Get all challenges
router.get('/', (req, res) => {
  const { language, difficulty } = req.query;
  
  let result = [];
  
  if (language) {
    result = challenges[language] || [];
  } else {
    result = [...challenges.python, ...challenges.cpp];
  }
  
  if (difficulty) {
    result = result.filter(c => c.difficulty === difficulty);
  }
  
  res.json(result);
});

// Get challenge by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const allChallenges = [...challenges.python, ...challenges.cpp];
  const challenge = allChallenges.find(c => c.id === id);
  
  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }
  
  res.json(challenge);
});

// Submit challenge solution
router.post('/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { code, userId } = req.body;
  
  const allChallenges = [...challenges.python, ...challenges.cpp];
  const challenge = allChallenges.find(c => c.id === id);
  
  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }
  
  // Here you would execute the code and check against test cases
  // For now, returning a mock response
  
  res.json({
    success: true,
    message: 'Solution submitted successfully',
    points: challenge.points,
    challengeId: id
  });
});

module.exports = router;
