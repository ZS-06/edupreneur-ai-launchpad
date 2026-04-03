import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Business Studies", "Economics", "Accounting", "English", "Psychology",
  "Sociology", "Art & Design",
];

const ratingQuestions = [
  {
    section: "Section B — Interests",
    questions: [
      "I enjoy solving real-world problems with practical impact.",
      "I am interested in innovation and entrepreneurship.",
      "I enjoy working on long-term projects.",
      "I prefer roles that involve leadership and decision-making.",
      "I enjoy improving systems and processes.",
      "I am interested in new and emerging technologies.",
      "I enjoy mentoring or guiding others.",
    ],
  },
  {
    section: "Section C — Skills",
    questions: [
      "I can apply theoretical knowledge in real situations.",
      "I can analyze complex data or information.",
      "I can lead and manage teams effectively.",
      "I can think strategically and plan ahead.",
      "I can communicate ideas professionally.",
      "I can solve problems in uncertain situations.",
    ],
  },
  {
    section: "Section D — Work Values",
    questions: [
      "Job stability is important to me.",
      "High income is important to me.",
      "Work-life balance is important to me.",
    ],
  },
];

const mcqQuestions = [
  {
    question: "In a professional setting, you prefer to:",
    options: [
      { value: "A", label: "Conduct research or analysis" },
      { value: "B", label: "Develop technical solutions" },
      { value: "C", label: "Design creative products" },
      { value: "D", label: "Work with people or communities" },
      { value: "E", label: "Manage business operations" },
      { value: "F", label: "Organize systems and processes" },
    ],
  },
  {
    question: "Your ideal work environment is:",
    options: [
      { value: "A", label: "Research lab" },
      { value: "B", label: "Engineering workspace" },
      { value: "C", label: "Creative studio" },
      { value: "D", label: "Social/community setting" },
      { value: "E", label: "Corporate/business setting" },
      { value: "F", label: "Structured office environment" },
    ],
  },
];

const totalRatingQuestions = ratingQuestions.reduce((sum, s) => sum + s.questions.length, 0);
const totalQuestions = 2 + totalRatingQuestions + mcqQuestions.length; // 2 subject questions

const CareerUndergrad = () => {
  const navigate = useNavigate();
  const [oLevelSubjects, setOLevelSubjects] = useState<string[]>([]);
  const [aLevelSubjects, setALevelSubjects] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Steps: 0 = O-Level subjects, 1 = A-Level subjects, 2-4 = rating sections, 5 = MCQs
  const sections = [
    { type: "olevels" as const, section: "Section A — O-Level Background", sectionIndex: 0 },
    { type: "alevels" as const, section: "Section A — A-Level Background", sectionIndex: 1 },
    ...ratingQuestions.map((s, i) => ({ type: "rating" as const, ...s, sectionIndex: i })),
    { type: "mcq" as const, section: "Section E — Scenarios", sectionIndex: ratingQuestions.length },
  ];

  const currentSection = sections[currentStep];
  const isComplete = currentStep >= sections.length;

  const answeredCount =
    (oLevelSubjects.length > 0 ? 1 : 0) +
    (aLevelSubjects.length > 0 ? 1 : 0) +
    Object.keys(ratings).length +
    Object.keys(mcqAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const getRatingOffset = (sectionIndex: number) => {
    let offset = 0;
    for (let i = 0; i < sectionIndex; i++) offset += ratingQuestions[i].questions.length;
    return offset;
  };

  const toggleSubject = (
    subject: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    max: number
  ) => {
    setList((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : prev.length < max
        ? [...prev, subject]
        : prev
    );
  };

  const canProceed = () => {
    if (isComplete) return true;
    if (currentSection.type === "olevels") return oLevelSubjects.length > 0;
    if (currentSection.type === "alevels") return aLevelSubjects.length > 0;
    if (currentSection.type === "rating") {
      const sec = ratingQuestions[currentSection.sectionIndex];
      const offset = getRatingOffset(currentSection.sectionIndex);
      return sec.questions.every((_, i) => ratings[offset + i] !== undefined);
    }
    return mcqQuestions.every((_, i) => mcqAnswers[i] !== undefined);
  };

  const handleSubmit = () => {
    console.log("O-Level Subjects:", oLevelSubjects);
    console.log("A-Level Subjects:", aLevelSubjects);
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
            Thank you for completing the Undergraduate Career Questionnaire. Your personalized results will be available soon.
          </p>
          <Button onClick={() => navigate("/career-guide")} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Career Guide
          </Button>
        </div>
      </div>
    );
  }

  const renderSubjectSelection = (
    title: string,
    max: number,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-2 text-sm font-medium text-foreground">{title}</p>
      <p className="mb-4 text-xs text-muted-foreground">{list.length}/{max} selected</p>
      <div className="grid grid-cols-2 gap-3">
        {subjectOptions.map((subject) => {
          const checked = list.includes(subject);
          return (
            <div
              key={subject}
              onClick={() => toggleSubject(subject, list, setList, max)}
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
  );

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
            Undergraduate <span className="text-gradient">Career Questionnaire</span>
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

        {currentSection.type === "olevels" &&
          renderSubjectSelection("Which O-Level subjects did you study? (Select up to 5)", 5, oLevelSubjects, setOLevelSubjects)}

        {currentSection.type === "alevels" &&
          renderSubjectSelection("Which A-Level subjects did you study? (Select up to 4)", 4, aLevelSubjects, setALevelSubjects)}

        {currentSection.type === "rating" && (
          <div className="space-y-6">
            {ratingQuestions[currentSection.sectionIndex].questions.map((q, i) => {
              const globalIndex = getRatingOffset(currentSection.sectionIndex) + i;
              const questionNumber = 2 + 1 + globalIndex;
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

        {currentSection.type === "mcq" && (
          <div className="space-y-6">
            {mcqQuestions.map((mcq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <p className="mb-4 text-sm font-medium text-foreground">
                  {2 + totalRatingQuestions + i + 1}. {mcq.question}
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

export default CareerUndergrad;
