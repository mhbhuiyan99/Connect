// src/app/sign-up/[[...sign-up]]/page.tsx
export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <form action="/api/auth/sign-up" method="POST">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          className="border p-2 rounded"
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="border p-2 rounded mt-2"
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
          Sign Up
        </button>
      </form>
    </div>
  );
}