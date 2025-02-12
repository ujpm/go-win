import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import questionsData from '../../questions.json';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TestState {
  currentPage: number;
  answers: { [key: number]: number };
  submitted: boolean;
}

const QUESTIONS_PER_PAGE = 5;

const PracticeTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testState, setTestState] = useState<TestState>({
    currentPage: 0,
    answers: {},
    submitted: false
  });

  useEffect(() => {
    // Randomly select 15 questions
    const allQuestions = questionsData.questions as Question[];
    const shuffledQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (testState.submitted) return;

    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex
      }
    }));
  };

  const handleSubmit = () => {
    setTestState(prev => ({
      ...prev,
      submitted: true
    }));
  };

  const handleRetake = () => {
    // Shuffle questions again
    const allQuestions = questionsData.questions as Question[];
    const shuffledQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    setQuestions(shuffledQuestions);
    
    // Reset test state
    setTestState({
      currentPage: 0,
      answers: {},
      submitted: false
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (testState.answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const currentQuestions = questions.slice(
    testState.currentPage * QUESTIONS_PER_PAGE,
    (testState.currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Practice Test</h2>
          <p className="text-muted-foreground">
            Page {testState.currentPage + 1} of {totalPages}
          </p>
        </div>

        <div className="space-y-8">
          {currentQuestions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border rounded-lg p-4"
            >
              <p className="font-medium text-lg mb-4">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optionIdx) => (
                  <button
                    key={optionIdx}
                    onClick={() => handleAnswer(q.id, optionIdx)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      testState.answers[q.id] === optionIdx
                        ? 'bg-secondary text-white'
                        : 'hover:bg-secondary/10'
                    } ${
                      testState.submitted
                        ? optionIdx === q.correctAnswer
                          ? 'bg-green-500 text-white'
                          : testState.answers[q.id] === optionIdx
                          ? 'bg-red-500 text-white'
                          : ''
                        : ''
                    }`}
                    disabled={testState.submitted}
                  >
                    <div className="flex items-center">
                      <span className="flex-1">{option}</span>
                      {testState.submitted && optionIdx === q.correctAnswer && (
                        <FiCheck className="w-5 h-5" />
                      )}
                      {testState.submitted && testState.answers[q.id] === optionIdx && optionIdx !== q.correctAnswer && (
                        <FiX className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {testState.submitted && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-accent">Explanation:</p>
                  <p className="text-muted-foreground">{q.explanation}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setTestState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
            disabled={testState.currentPage === 0}
            className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          
          {testState.submitted ? (
            <button
              onClick={handleRetake}
              className="px-6 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90"
            >
              Retake Test
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90"
              disabled={Object.keys(testState.answers).length < questions.length}
            >
              Submit
            </button>
          )}
          
          <button
            onClick={() => setTestState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
            disabled={testState.currentPage === totalPages - 1}
            className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

        {testState.submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gray-50 rounded-lg text-center"
          >
            <h3 className="text-xl font-bold text-accent mb-2">Test Complete!</h3>
            <p className="text-lg text-muted-foreground">
              You scored {calculateScore()} out of {questions.length} questions correctly.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PracticeTest;
