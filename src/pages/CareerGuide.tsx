import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, FlaskConical, GraduationCap } from "lucide-react";

const options = [
  {
    title: "O-Levels",
    description: "Navigating your first big academic decisions? Let's find the subjects and paths that set you up for success.",
    icon: BookOpen,
    route: "/career-guide/olevels",
  },
  {
    title: "A-Levels",
    description: "Choosing the right combination can shape your future. Get AI-powered guidance tailored to your strengths.",
    icon: FlaskConical,
    route: "/career-guide/alevels",
  },
  {
    title: "Undergrad Program",
    description: "Picking a degree is a big deal. Let's match your interests and goals to the perfect program.",
    icon: GraduationCap,
    route: "/career-guide/undergrad",
  },
];

const CareerGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="mb-16 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Where Are You on Your{" "}
            <span className="text-gradient">Journey</span>?
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Tell us your stage, and we'll craft the perfect roadmap — just for you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {options.map((opt) => (
            <button
              key={opt.title}
              onClick={() => navigate(opt.route)}
              className="group flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-cta"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-hero-gradient text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                <opt.icon className="h-7 w-7" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {opt.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {opt.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerGuide;
