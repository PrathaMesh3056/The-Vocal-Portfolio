import React from 'react';

const Contact = () => (
  <div className="bg-black rounded-xl shadow-lg p-8 animate-fadeIn">
    <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>
    <div className="space-y-3 text-white ">
      <p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=patil30pratham@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-green-500 hover:scale-110 transition-colors duration-200"
        >
          📧 Email
        </a>
      </p>
            <p>
        <a
          href="https://github.com/PrathaMesh3056"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-500 hover:scale-115 transition-transform duration-200"
        >
          🐙 GitHub
        </a>
      </p>
      <p>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-500 hover:scale-125 transition-transform duration-200"
        >
          💼 LinkedIn
        </a>
      </p>

    </div>
  </div>
);

export default Contact;