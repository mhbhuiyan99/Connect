// src/app/sign-in/[[...sign-in]]/page.tsx
export default function SignInPage() {
  return (
    <div className="flex items-center justify-center">
      <form action="/api/auth/sign-in" method="POST">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded mt-2"
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}