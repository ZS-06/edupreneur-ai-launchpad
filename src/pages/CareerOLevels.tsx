import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const ratingQuestions = [
  {
    section: "Section A — Interests",
    questions: [
      "I enjoy solving logical or mathematical problems.",
      "I like working with tools, machines, or physical objects.",
      "I enjoy creating designs, drawings, or artistic work.",
      "I like helping people with their personal or academic problems.",
      "I enjoy leading or organizing group activities.",
      "I prefer tasks that involve organizing data or information.",
      "I enjoy learning how things work in detail.",
      "I like experimenting and discovering new ideas.",
    ],
  },
  {
    section: "Section B — Skills",
    questions: [
      "I can understand new concepts quickly.",
      "I can clearly explain my ideas to others.",
      "I am good at solving problems step by step.",
      "I pay attention to small details.",
      "I am comfortable using computers and technology.",
      "I can work well in a team.",
    ],
  },
  {
    section: "Section C — Work Style",
    questions: [
      "I complete my work carefully and accurately.",
      "I take responsibility for my tasks.",
      "I am open to learning new things.",
    ],
  },
];

const mcqQuestions = [
  {
    question: "In a group project, you prefer to:",
    options: [
      { value: "A", label: "Analyze and solve problems" },
      { value: "B", label: "Build or fix something" },
      { value: "C", label: "Design visuals or creative content" },
      { value: "D", label: "Help and support others" },
      { value: "E", label: "Lead the group" },
      { value: "F", label: "Organize data and reports" },
    ],
  },
  {
    question: "Your favorite activity is:",
    options: [
      { value: "A", label: "Researching or analyzing" },
      { value: "B", label: "Building or repairing" },
      { value: "C", label: "Creating or designing" },
      { value: "D", label: "Helping others" },
      { value: "E", label: "Leading activities" },
      { value: "F", label: "Organizing tasks" },
    ],
  },
  {
    question: "You enjoy tasks that are:",
    options: [
      { value: "A", label: "Logical and analytical" },
      { value: "B", label: "Practical and hands-on" },
      { value: "C", label: "Creative and expressive" },
      { value: "D", label: "Social and people-focused" },
      { value: "E", label: "Leadership-based" },
      { value: "F", label: "Structured and organized" },
    ],
  },
];

const totalRatingQuestions = ratingQuestions.reduce((sum, s) => sum + s.questions.length, 0);
const totalQuestions = totalRatingQuestions + mcqQuestions.length;

const CareerOLevels = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [currentStep, setCurrentStep] = useState(0); // 0..3 for sections, 4 for MCQs, 5 for done

  const sections = [
    ...ratingQuestions.map((s, i) => ({ type: "rating" as const, ...s, sectionIndex: i })),
    { type: "mcq" as const, section: "Section D — Scenarios", sectionIndex: 3 },
  ];

  const currentSection = sections[currentStep];
  const isComplete = currentStep >= sections.length;

  const answeredCount = Object.keys(ratings).length + Object.keys(mcqAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  // Calculate global question index offset for rating sections
  const getRatingOffset = (sectionIndex: number) => {
    let offset = 0;
    for (let i = 0; i < sectionIndex; i++) {
      offset += ratingQuestions[i].questions.length;
    }
    return offset;
  };

  const canProceed = () => {
    if (isComplete) return true;
    if (currentSection.type === "rating") {
      const sec = ratingQuestions[currentSection.sectionIndex];
      const offset = getRatingOffset(currentSection.sectionIndex);
      return sec.questions.every((_, i) => ratings[offset + i] !== undefined);
    }
    return mcqQuestions.every((_, i) => mcqAnswers[i] !== undefined);
  };

  const handleSubmit = () => {
    // TODO: send data to backend
    console.log("Ratings:", ratings);
    console.log("MCQ Answers:", mcqAnswers);
    setCurrentStep(sections.length);
  };

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Questionnaire <span className="text-gradient">Complete!</span>
          </h1>
          <p className="mb-8 text-muted-foreground">
            Thank you for completing the O-Levels Career Questionnaire. Your personalized results will be available soon.
          </p>
          <Button
            onClick={() => navigate("/career-guide")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Guide
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (currentStep === 0 ? navigate("/career-guide") : setCurrentStep(currentStep - 1))}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 0 ? "Back to Career Guide" : "Previous Section"}
          </button>

          <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            O-Levels <span className="text-gradient">Career Questionnaire</span>
          </h1>
          <p className="text-muted-foreground">
            Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentSection.section}</span>
            <span>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Rating Section */}
        {currentSection.type === "rating" && (
          <div className="space-y-6">
            {ratingQuestions[currentSection.sectionIndex].questions.map((q, i) => {
              const globalIndex = getRatingOffset(currentSection.sectionIndex) + i;
              return (
                <div
                  key={globalIndex}
                  className="rounded-xl border border-border bg-card p-5 transition-colors"
                >
                  <p className="mb-4 text-sm font-medium text-foreground">
                    {globalIndex + 1}. {q}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">Strongly Disagree</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => setRatings((prev) => ({ ...prev, [globalIndex]: val }))}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                            ratings[globalIndex] === val
                              ? "border-primary bg-primary text-primary-foreground shadow-md"
                              : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:text-foreground"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">Strongly Agree</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MCQ Section */}
        {currentSection.type === "mcq" && (
          <div className="space-y-6">
            {mcqQuestions.map((mcq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="mb-4 text-sm font-medium text-foreground">
                  {totalRatingQuestions + i + 1}. {mcq.question}
                </p>
                <RadioGroup
                  value={mcqAnswers[i] || ""}
                  onValueChange={(val) => setMcqAnswers((prev) => ({ ...prev, [i]: val }))}
                  className="space-y-2"
                >
                  {mcq.options.map((opt) => (
                    <div
                      key={opt.value}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer ${
                        mcqAnswers[i] === opt.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/30"
                      }`}
                      onClick={() => setMcqAnswers((prev) => ({ ...prev, [i]: opt.value }))}
                    >
                      <RadioGroupItem value={opt.value} id={`mcq-${i}-${opt.value}`} />
                      <Label htmlFor={`mcq-${i}-${opt.value}`} className="cursor-pointer text-sm text-foreground">
                        {opt.value}. {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-end pb-10">
          {currentStep < sections.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="gap-2"
            >
              Next Section
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Submit Questionnaire
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerOLevels;
