'use client'
import { useState } from 'react'

export default function Debug() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await fetch('/api/auth/debug')
    const data = await response.json()
    setUsers(data.users)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Debug Users</h1>
        <button 
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Load Users
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Users in Memory:</h2>
          {users.length === 0 ? (
            <p>No users loaded</p>
          ) : (
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="border p-4 rounded">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Password Hash:</strong> {user.password}</p>
                  <p><strong>Name:</strong> {user.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800">Test Accounts:</h3>
          <p className="text-yellow-700">Default test account: test@example.com / password123</p>
        </div>
      </div>
    </div>
  )
}
