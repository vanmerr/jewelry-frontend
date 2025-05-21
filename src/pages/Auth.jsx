import AuthForm from "../components/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fc00ff]/10 via-white to-[#00dbde]/10">
      <div className="max-w-md w-full p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg border border-gradient-to-br from-[#fc00ff]/30 to-[#00dbde]/30">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent drop-shadow-lg tracking-widest mb-2">
            Welcome to Desires
          </h1>
          <div className="text-gray-500 italic text-sm md:text-base font-light">
            Luxury Jewelry Authentication
          </div>
        </div>
        <AuthForm />
      </div>
    </div>
  );
} 