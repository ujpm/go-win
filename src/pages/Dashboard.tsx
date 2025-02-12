import { useState } from 'react'

const stats = [
  { name: 'Completed Lessons', value: '0' },
  { name: 'Practice Tests Taken', value: '0' },
  { name: 'Average Score', value: '0%' },
  { name: 'Time Spent Learning', value: '0h' },
]

const lessons = [
  {
    id: 1,
    title: 'Introduction to Road Signs',
    description: 'Learn about different types of road signs and their meanings.',
    progress: 0,
  },
  {
    id: 2,
    title: 'Traffic Rules and Regulations',
    description: 'Understanding basic traffic rules and regulations in Rwanda.',
    progress: 0,
  },
  {
    id: 3,
    title: 'Vehicle Controls',
    description: 'Learn about basic vehicle controls and their functions.',
    progress: 0,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:pb-0">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h3>
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="overview">Overview</option>
              <option value="lessons">My Lessons</option>
              <option value="tests">Practice Tests</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`${
                  activeTab === 'lessons'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
              >
                My Lessons
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`${
                  activeTab === 'tests'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
              >
                Practice Tests
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'overview' && (
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <div className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="mt-8 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                    <h3 className="text-sm font-semibold text-gray-800">
                      <a href="#" className="hover:underline focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {lesson.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                    <div className="mt-4">
                      <div className="relative h-2 w-full bg-gray-200 rounded">
                        <div
                          className="absolute h-full bg-indigo-500 rounded"
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No practice tests available</h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete your lessons first to unlock practice tests.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
