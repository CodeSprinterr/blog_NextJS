import AuthForm from '../components/AuthForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex p-2">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-10 md:py-0">
                <AuthForm />
            </div>
            <div className="hidden md:block md:w-1/2">
                <img
                    src="/images/side.jpg"
                    alt="Login illustration"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
        </div>
    );
}
