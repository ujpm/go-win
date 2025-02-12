import { useAuth } from '@/contexts/auth'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Welcome, {user?.firstName} {user?.lastName}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>You have access to the following admin features:</p>
              </div>
              <div className="mt-5">
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="py-4">Manage Users</li>
                  <li className="py-4">Create and Edit Courses</li>
                  <li className="py-4">View Analytics</li>
                  <li className="py-4">Manage Content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
