function contact() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      <p className="mb-2">Email:a@gmail.com
        <a
          href="mailto:gmailcom"
            className="text-blue-500 hover:underline"
        >gmail.com</a>
      </p>
      <p className="mb-2">Phone: +1234567890</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a
                href="https://www.linkedin.com/in/yourprofile"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >LinkedIn</a>
            <a
                href=".com"
                className="text-gray-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >GitHub</a>
        </div>
    </div>
  );
} 

export default contact;
