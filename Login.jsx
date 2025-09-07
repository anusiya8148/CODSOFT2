import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card text-center">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-gray-600 mt-2">Use your Gmail / Google account</p>
        <button onClick={loginWithGoogle} className="btn-primary mt-6 w-full">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
