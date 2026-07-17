import { useMemo, useState } from "react";
import { questions } from "../../data/questions";
import { useExperienceStore } from "../../store/useExperienceStore";

export const Questionnaire = () => {
  const [index, setIndex] = useState(0);
  const answers = useExperienceStore((state) => state.answers);
  const answerQuestion = useExperienceStore((state) => state.answerQuestion);
  const completeQuestionnaire = useExperienceStore((state) => state.completeQuestionnaire);
  const setRoute = useExperienceStore((state) => state.setRoute);
  const question = questions[index];
  const isLast = index === questions.length - 1;

  const progress = useMemo(() => `${index + 1}/${questions.length}`, [index]);

  const goNext = () => {
    if (isLast) {
      completeQuestionnaire();
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <section className="screen questionnaire-screen">
      <div className="question-card">
        <div className="topline">
          <button className="text-button" onClick={() => setRoute("landing")}>
            Leave
          </button>
          <span aria-label={`Question ${progress}`}>{progress}</span>
        </div>
        <div className="room-progress" aria-hidden="true">
          {questions.map((item, itemIndex) => (
            <span
              key={item.id}
              className={itemIndex <= index ? "progress-mark active" : "progress-mark"}
            />
          ))}
        </div>
        <h2>{question.prompt}</h2>
        <div className="answer-list">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={answers[question.id] === option.id ? "answer selected" : "answer"}
              onClick={() => answerQuestion(question.id, option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="actions">
          <button className="text-button" onClick={() => answerQuestion(question.id, null)}>
            Skip
          </button>
          <button className="primary-button" onClick={goNext}>
            {isLast ? "Form the room" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
};
