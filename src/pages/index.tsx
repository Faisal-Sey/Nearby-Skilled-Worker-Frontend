import { useRouter } from "next/router";


export default function LandingPage() {
  // Initialize the router hook
  const router = useRouter();

  return (
    <div className="bg-white m-0 p-0 flex flex-col items-center justify-center h-[100vh]">
      <h3 className="font-bold">Welcome to Gigs Platform!</h3>
      <div className="flex flex-row mt-3">
        <button 
          type="button" 
          onClick={() => router.push('/auth/login')}
          className="p-1 text-[#fff] bg-blue-600"
        >
          Login
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/auth/signup')}
          className="py-1 px-2 ml-1 text-[#fff] bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}
