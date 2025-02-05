import SignIn from './SignIn';

const SessionNotFound = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Please Sign In to create or see your degree plans</h1>
            <SignIn />
        </div>
    );
};

export default SessionNotFound;
