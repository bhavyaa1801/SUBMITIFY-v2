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

      <div className="review-layout">

        {/* ================= LEFT ================= */}

        <div className="review-sidebar">

          <div className="review-box">

            <div className="review-section-label">
              <span className="form-section-bullet">▸</span>
              Project Details
            </div>

            <div className="review-table">

              <div className="review-row">
                <span>University</span>
                <span>{data.university || "—"}</span>
              </div>

              <div className="review-row">
                <span>Department</span>
                <span>{data.department || "—"}</span>
              </div>

              <div className="review-row">
                <span>Academic Year</span>
                <span>{data.academicYear || "—"}</span>
              </div>

              <div className="review-row">
                <span>Semester</span>
                <span>{data.semester || "—"}</span>
              </div>

              <div className="review-row">
                <span>Subject</span>
                <span>{data.subject || "—"}</span>
              </div>

              <div className="review-row">
                <span>Subject Code</span>
                <span>{data.subjectCode || "—"}</span>
              </div>

              <div className="review-row">
                <span>Course</span>
                <span>{data.course || "—"}</span>
              </div>

              <div className="review-row">
                <span>Student Name</span>
                <span>{data.studentName || "—"}</span>
              </div>

              <div className="review-row">
                <span>Enrollment No.</span>
                <span>{data.rollNumber || "—"}</span>
              </div>

              <div className="review-row">
                <span>Submitted To</span>
                <span>{data.submittedTo || "—"}</span>
              </div>

              <div className="review-row">
                <span>Designation</span>
                <span>{data.designation || "—"}</span>
              </div>

              <div className="review-row">
                <span>Language</span>
                <span>{data.language || "—"}</span>
              </div>

              <div className="review-row">
                <span>Profile</span>
                <span>{data.profile || "—"}</span>
              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="review-content">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <strong>
              {data.questions.length} Parsed Questions
            </strong>

            <button
              className="btn-ghost"
              onClick={addQuestion}
            >
              + Add Question
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

          <div
            style={{
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
                    alignItems: "center",
                    marginBottom: 8,
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
                  rows={2}
                  style={{
                    minHeight: "56px",
                  }}
                  value={q.text}
                  onChange={(e) =>
                    updateQuestion(index, e.target.value)
                  }
                />

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="step-actions between">

        <button
          className="btn-ghost"
          onClick={onBack}
        >
          ← Back
        </button>



      </div>

    </div>
  );
}