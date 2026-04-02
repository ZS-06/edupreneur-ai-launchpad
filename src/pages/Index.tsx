import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      {/* Auth CTA Section */}
      <section ref={ctaRef} className="flex min-h-screen items-center justify-center px-6">
        <div
          className={`flex w-full max-w-md flex-col items-center gap-6 transition-all duration-700 ${
            showCTAs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl text-center">
            For a Better <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-center text-muted-foreground">
            Log in or create an account to unlock personalized AI guidance.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="flex h-12 w-64 items-center justify-center rounded-lg bg-hero-gradient font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Log In
          </button>

          <div className="flex items-center gap-3 text-muted-foreground/50">
            <span className="h-px w-12 bg-border" />
            <span className="text-sm">or</span>
            <span className="h-px w-12 bg-border" />
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="flex h-12 w-64 items-center justify-center rounded-lg border border-border font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
