
function projects() {
    return (    

    <div className="p-4 bg-green-100 rounded shadow">   
        <h2 className="text-xl font-bold mb-2">My Projects</h2>
        <ul className="list-disc list-inside">
            <li className="mb-2">
                <h3 className="font-semibold">Project One</h3>
                <p>A web application that allows users to track their tasks and manage their time effectively.</p>
            </li>
            <li className="mb-2">
                <h3 className="font-semibold">Project Two</h3>
                <p>An e-commerce platform that provides a seamless shopping experience with integrated payment solutions.</p>
            </li>
            <li className="mb-2">
                <h3 className="font-semibold">Project Three</h3>
                <p>A mobile app that helps users monitor their fitness goals and stay motivated through social features.</p>
            </li>
        </ul>
    </div>
    );
}
export default projects;