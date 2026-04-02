import { useNavigate } from "react-router-dom";
import { GraduationCap, Rocket } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
          What Would You Like to <span className="text-gradient">Explore</span>?
        </h1>
        <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground">
          Choose your path — we'll guide you from here.
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/career-guide")}
            className="group flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-cta sm:w-1/2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-hero-gradient text-primary-foreground transition-transform duration-300 group-hover:scale-110">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Career Guide</h2>
            <p className="text-sm text-muted-foreground">
              Discover your ideal career path with AI-powered guidance
            </p>
          </button>

          <button
            onClick={() => navigate("/startup-predictor")}
            className="group flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-cta sm:w-1/2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
              <Rocket className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Startup Success Predictor
            </h2>
            <p className="text-sm text-muted-foreground">
              Evaluate your startup idea's potential with AI analysis
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
