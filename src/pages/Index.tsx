import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Rocket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showCTAs, setShowCTAs] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCTAs(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-[200vh] bg-background">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            <span className="text-gradient">EduPreneur</span>
            <span className="text-muted-foreground">.AI</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Whether you want to determine your career path or see if your startup will be a success
            — this is the place for you.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground/50">
            <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
            <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="flex min-h-screen items-center justify-center px-6">
        <div
          className={`flex w-full max-w-4xl flex-col items-center gap-8 sm:flex-row sm:gap-6 transition-all duration-700 ${
            showCTAs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => navigate("/career-guide")}
            className="group flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 shadow-card transition-all duration-300 hover:shadow-cta hover:-translate-y-1 hover:border-primary/30 sm:w-1/2"
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
            className="group flex w-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 shadow-card transition-all duration-300 hover:shadow-cta hover:-translate-y-1 hover:border-accent/30 sm:w-1/2"
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
      </section>
    </div>
  );
};

export default Index;
