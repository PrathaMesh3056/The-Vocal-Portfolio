import React from 'react';
const Projects = () => (
  <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Projects</h2>
    <div className="space-y-4">
      <div className="border-l-4 border-blue-500 pl-4">
        <h3 className="font-semibold text-gray-800">Voice-Controlled Portfolio</h3>
        <p className="text-gray-600 text-sm">Interactive voice navigation system</p>
      </div>
      <div className="border-l-4 border-green-500 pl-4">
        <h3 className="font-semibold text-gray-800">AI Assistant Platform</h3>
        <p className="text-gray-600 text-sm">Smart automation solutions</p>
      </div>
    </div>
  </div>
);

export default Projects;