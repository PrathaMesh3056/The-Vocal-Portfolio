function Resume (){
    return(
        <div>
            <h1 className="text-2xl font-bold mb-4">Resume</h1>
            <p className="mb-4">You can download my resume by clicking the link below:</p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Download Resume
            </a>
        </div>
    );
}
export default Resume;