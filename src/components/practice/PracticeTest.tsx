import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import questionsData from '../../questions.json';

interface Question {
  id: number;
  question: string;
  answer: string;
  options?: string[];
}

interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

const PracticeTest: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questionsPerPage = 5;
  const totalQuestions = 15;

  // Generate options for a question
  const generateOptions = (correctAnswer: string): string[] => {
    const allAnswers = questionsData.map(q => q.answer);
    const options = new Set<string>([correctAnswer]);
    
    while (options.size < 4) {
      const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
      options.add(randomAnswer);
    }
    
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  // Initialize or reset the test
  const initializeTest = () => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, totalQuestions).map(q => ({
      ...q,
      options: generateOptions(q.answer)
    }));
    setSelectedQuestions(selected);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
    setCurrentPage(0);
  };

  useEffect(() => {
    initializeTest();
  }, []);

  const handleAnswerSelect = (questionId: number, selectedAnswer: string, correctAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer;
    setUserAnswers(prev => [
      ...prev.filter(a => a.questionId !== questionId),
      { questionId, selectedAnswer, isCorrect }
    ]);
  };

  const handleSubmit = () => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    setScore((correctAnswers / totalQuestions) * 100);
    setShowResults(true);
  };

  const getCurrentPageQuestions = () => {
    const start = currentPage * questionsPerPage;
    return selectedQuestions.slice(start, start + questionsPerPage);
  };

  const getAnswerStyle = (questionId: number, option: string) => {
    if (!showResults) {
      const isSelected = userAnswers.find(
        a => a.questionId === questionId && a.selectedAnswer === option
      );
      return isSelected ? 'bg-secondary/20' : '';
    }

    const question = selectedQuestions.find(q => q.id === questionId);
    const userAnswer = userAnswers.find(a => a.questionId === questionId);

    if (option === question?.answer) {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    if (userAnswer?.selectedAnswer === option && !userAnswer.isCorrect) {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    return 'opacity-50';
  };

  if (selectedQuestions.length === 0) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!showResults ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-accent mb-4">
              Practice Test - Page {currentPage + 1} of {Math.ceil(totalQuestions / questionsPerPage)}
            </h2>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${((currentPage * questionsPerPage + getCurrentPageQuestions().length) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-8">
            {getCurrentPageQuestions().map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-accent mb-4">
                  {currentPage * questionsPerPage + index + 1}. {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options?.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, option, question.answer)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                        ${getAnswerStyle(question.id, option)}
                        hover:bg-secondary/10`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-white disabled:opacity-50"
            >
              <FiArrowLeft />
              <span>Previous</span>
            </button>

            {currentPage === Math.ceil(totalQuestions / questionsPerPage) - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={userAnswers.length < totalQuestions}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-white disabled:opacity-50"
              >
                <span>Submit Test</span>
                <FiArrowRight />
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-white"
              >
                <span>Next</span>
                <FiArrowRight />
              </button>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-accent mb-4">Test Results</h2>
          <div className="mb-8">
            <div className="text-4xl font-bold text-center mb-2">
              {score.toFixed(1)}%
            </div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-secondary rounded-full transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {selectedQuestions.map((question, index) => {
              const userAnswer = userAnswers.find(a => a.questionId === question.id);
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    userAnswer?.isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="font-semibold mb-2">
                    {index + 1}. {question.question}
                  </div>
                  <div className="text-sm">
                    <div className="text-green-800">
                      Correct Answer: {question.answer}
                    </div>
                    {!userAnswer?.isCorrect && (
                      <div className="text-red-800">
                        Your Answer: {userAnswer?.selectedAnswer}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={initializeTest}
            className="mt-8 flex items-center space-x-2 px-6 py-3 rounded-lg bg-secondary text-white mx-auto"
          >
            <FiRefreshCw className="w-5 h-5" />
            <span>Retake Test</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PracticeTest;
