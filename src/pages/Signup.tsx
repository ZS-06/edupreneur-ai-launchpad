import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-center">
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
              Create Your <span className="text-gradient">Account</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Sign up form coming soon — we're building something great.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary transition-colors hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
