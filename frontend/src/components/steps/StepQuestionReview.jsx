import { useState } from "react";

export default function StepQuestionReview({
  data,
  update,
  onBack,
  onGenerate,
}) {
  const [loading, setLoading] = useState(false);

  const updateQuestion = (index, value) => {
    const questions = [...data.questions];

    questions[index] = {
      ...questions[index],
      text: value,
    };

    update({ questions });
  };

  const deleteQuestion = (index) => {
    const questions = data.questions.filter((_, i) => i !== index);

    update({
      questions: questions.map((q, i) => ({
        ...q,
        number: i + 1,
      })),
    });
  };

  const addQuestion = () => {
    update({
      questions: [
        ...data.questions,
        {
          number: data.questions.length + 1,
          text: "",
        },
      ],
    });
  };

  const handleGenerate = async () => {
    setLoading(true);

    try {
      await onGenerate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-container">

      <div className="step-label">
        // step_03 › review_questions
      </div>

      <h2 className="step-title">
        Review Parsed Questions
      </h2>

      <p className="step-sub">
        Review the parsed questions before generating the document.
      </p>

      {/* Metadata */}

      <div className="review-box">

        <div className="review-section-label">
          <span className="form-section-bullet">▸</span>
          Project
        </div>

        <div className="review-table">

          <div className="review-row">
            <span>Institution</span>
            <span>{data.institution}</span>
          </div>

          <div className="review-row">
            <span>Subject</span>
            <span>{data.subject}</span>
          </div>

          <div className="review-row">
            <span>Profile</span>
            <span>{data.profile}</span>
          </div>

          <div className="review-row">
            <span>Language</span>
            <span>{data.language}</span>
          </div>

        </div>

      </div>

      {/* Questions */}

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >

        {data.questions.map((q, index) => (

          <div
            key={index}
            className="review-box"
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >

              <strong>
                Question {q.number}
              </strong>

              <button
                className="btn-ghost"
                onClick={() => deleteQuestion(index)}
              >
                Delete
              </button>

            </div>

            <textarea
              className="exp-input"
              rows={3}
              value={q.text}
              onChange={(e) =>
                updateQuestion(index, e.target.value)
              }
            />

          </div>

        ))}

      </div>

      <div
        style={{
          marginTop: 20,
        }}
      >

        <button
          className="btn-ghost"
          onClick={addQuestion}
        >
          + Add Question
        </button>

      </div>

      <div className="step-actions between">

        <button
          className="btn-ghost"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          className="btn-generate"
          onClick={handleGenerate}
          disabled={loading || data.questions.length === 0}
        >
          {loading
            ? "Generating..."
            : "Generate Document ⚡"}
        </button>

      </div>

    </div>
  );
}