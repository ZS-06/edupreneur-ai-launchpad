import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const oLevelSubjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Business Studies", "Economics", "Accounting", "English", "Psychology",
  "Sociology", "Art & Design",
];

const ratingQuestions = [
  {
    section: "Section B — Interests",
    questions: [
      "I enjoy analyzing complex problems or data.",
      "I like solving real-world challenges using logic.",
      "I enjoy creative thinking and innovation.",
      "I am interested in helping people improve their lives.",
      "I enjoy managing or influencing others.",
      "I prefer structured systems and processes.",
      "I enjoy working with technology or software tools.",
      "I like research and investigation work.",
    ],
  },
  {
    section: "Section C — Skills",
    questions: [
      "I can think critically and evaluate solutions.",
      "I can communicate effectively in discussions.",
      "I am comfortable working with numbers and data.",
      "I can adapt to new situations easily.",
      "I manage my time effectively.",
      "I can work both independently and in teams.",
    ],
  },
  {
    section: "Section D — Work Style",
    questions: [
      "I take responsibility for important decisions.",
      "I stay calm under pressure.",
      "I am open to feedback and improvement.",
    ],
  },
];

const mcqQuestions = [
  {
    question: "You prefer tasks that involve:",
    options: [
      { value: "A", label: "Data analysis" },
      { value: "B", label: "Engineering or building" },
      { value: "C", label: "Creative design" },
      { value: "D", label: "Helping people" },
      { value: "E", label: "Managing teams" },
      { value: "F", label: "Organizing systems" },
    ],
  },
  {
    question: "You feel most satisfied when:",
    options: [
      { value: "A", label: "You solve a difficult problem" },
      { value: "B", label: "You build something useful" },
      { value: "C", label: "You create something original" },
      { value: "D", label: "You help others succeed" },
      { value: "E", label: "You lead a team" },
      { value: "F", label: "You organize tasks efficiently" },
    ],
  },
];

const totalRatingQuestions = ratingQuestions.reduce((sum, s) => sum + s.questions.length, 0);
const totalQuestions = 1 + totalRatingQuestions + mcqQuestions.length; // 1 for subject selection

const CareerALevels = () => {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Steps: 0 = Subject selection, 1-3 = rating sections, 4 = MCQs
  const sections = [
    { type: "subjects" as const, section: "Section A — Academic Background", sectionIndex: 0 },
    ...ratingQuestions.map((s, i) => ({ type: "rating" as const, ...s, sectionIndex: i })),
    { type: "mcq" as const, section: "Section E — Scenarios", sectionIndex: ratingQuestions.length },
  ];

  const currentSection = sections[currentStep];
  const isComplete = currentStep >= sections.length;

  const answeredCount =
    (selectedSubjects.length > 0 ? 1 : 0) +
    Object.keys(ratings).length +
    Object.keys(mcqAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const getRatingOffset = (sectionIndex: number) => {
    let offset = 0;
    for (let i = 0; i < sectionIndex; i++) {
      offset += ratingQuestions[i].questions.length;
    }
    return offset;
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : prev.length < 5
        ? [...prev, subject]
        : prev
    );
  };

  const canProceed = () => {
    if (isComplete) return true;
    if (currentSection.type === "subjects") return selectedSubjects.length > 0;
    if (currentSection.type === "rating") {
      const sec = ratingQuestions[currentSection.sectionIndex];
      const offset = getRatingOffset(currentSection.sectionIndex);
      return sec.questions.every((_, i) => ratings[offset + i] !== undefined);
    }
    return mcqQuestions.every((_, i) => mcqAnswers[i] !== undefined);
  };

  const handleSubmit = () => {
    console.log("Subjects:", selectedSubjects);
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
            Thank you for completing the A-Levels Career Questionnaire. Your personalized results will be available soon.
          </p>
          <Button onClick={() => navigate("/career-guide")} variant="outline" className="gap-2">
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
        <div className="mb-8">
          <button
            onClick={() => (currentStep === 0 ? navigate("/career-guide") : setCurrentStep(currentStep - 1))}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 0 ? "Back to Career Guide" : "Previous Section"}
          </button>
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            A-Levels <span className="text-gradient">Career Questionnaire</span>
          </h1>
          <p className="text-muted-foreground">Answer all questions to receive personalized guidance</p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentSection.section}</span>
            <span>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Subject Selection */}
        {currentSection.type === "subjects" && (
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-sm font-medium text-foreground">
              Which O-Level subjects did you study? (Select up to 5)
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{selectedSubjects.length}/5 selected</p>
            <div className="grid grid-cols-2 gap-3">
              {oLevelSubjects.map((subject) => {
                const checked = selectedSubjects.includes(subject);
                return (
                  <div
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer ${
                      checked ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Checkbox checked={checked} />
                    <Label className="cursor-pointer text-sm text-foreground">{subject}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rating Sections */}
        {currentSection.type === "rating" && (
          <div className="space-y-6">
            {ratingQuestions[currentSection.sectionIndex].questions.map((q, i) => {
              const globalIndex = getRatingOffset(currentSection.sectionIndex) + i;
              const questionNumber = 1 + 1 + globalIndex; // 1 subject Q + offset
              return (
                <div key={globalIndex} className="rounded-xl border border-border bg-card p-5 transition-colors">
                  <p className="mb-4 text-sm font-medium text-foreground">{questionNumber}. {q}</p>
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
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <p className="mb-4 text-sm font-medium text-foreground">
                  {1 + totalRatingQuestions + i + 1}. {mcq.question}
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
                        mcqAnswers[i] === opt.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
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

        <div className="mt-8 flex justify-end pb-10">
          {currentStep < sections.length - 1 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()} className="gap-2">
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

export default CareerALevels;
