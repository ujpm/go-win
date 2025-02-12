import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course, Module, Step } from '../../types/course';

export const CourseViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
      setCurrentModule(data.modules[0]);
      setCurrentStep(data.modules[0].steps[0]);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const updateProgress = async () => {
    if (!currentModule || !currentStep) return;

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          moduleId: currentModule.id,
          stepId: currentStep.id,
          completed: true,
        }),
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleNextStep = () => {
    if (!course || !currentModule || !currentStep) return;

    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id);
    const currentStepIndex = currentModule.steps.findIndex(s => s.id === currentStep.id);

    if (currentStepIndex < currentModule.steps.length - 1) {
      // Next step in current module
      setCurrentStep(currentModule.steps[currentStepIndex + 1]);
    } else if (currentModuleIndex < course.modules.length - 1) {
      // First step of next module
      const nextModule = course.modules[currentModuleIndex + 1];
      setCurrentModule(nextModule);
      setCurrentStep(nextModule.steps[0]);
    }

    updateProgress();
  };

  if (!course || !currentModule || !currentStep) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{course.title}</h2>
          {course.modules.map((module) => (
            <div key={module.id} className="mb-4">
              <h3 className="font-semibold mb-2">{module.title}</h3>
              <ul className="space-y-2">
                {module.steps.map((step) => (
                  <li
                    key={step.id}
                    className={`cursor-pointer p-2 rounded ${
                      currentStep.id === step.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setCurrentModule(module);
                      setCurrentStep(step);
                    }}
                  >
                    {step.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{currentStep.title}</h1>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: currentStep.content }} />
          
          {currentStep.quiz && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Quiz</h3>
              {/* Quiz component would go here */}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => navigate('/courses')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Back to Courses
            </button>
            <button
              onClick={handleNextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
