import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StartupPredictor = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="mb-4 font-display text-4xl font-bold text-foreground">Startup Success Predictor</h1>
        <p className="mb-8 text-muted-foreground">This page is coming soon.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default StartupPredictor;
