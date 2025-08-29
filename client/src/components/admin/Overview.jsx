import React from 'react';

const Overview = ({ users, requests }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Users</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.userId} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Word Requests</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            {requests.slice(0, 5).map((req) => (
              <div key={req.wordRequestId} className="py-2">
                <p className="font-medium">{req.newEnglishWord}</p>
                <p className="text-sm text-gray-600">Status: {req.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
