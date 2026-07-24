import { useState } from "react";
import { uploadImage } from "../../services/generate";

const LANGUAGES = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "SQL",
  "R",
  "MATLAB",
  "Other",
];

const PROFILES = [
  { value: "programming", label: "Programming" },
  { value: "theory", label: "Theory" },
  { value: "sql", label: "SQL" },
  { value: "networking", label: "Networking" },
  { value: "mathematics", label: "Mathematics" },
  { value: "generic", label: "Generic" },
];

export default function StepProjectInfo({ data, update, onNext }) {
  const [logoPreview, setLogoPreview] = useState(data.logo || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
      update({
        logo: url,
      });
      setLogoPreview(url);
    } catch (err) {
      alert(err.message);
    }

  };

  return (
    <div className="step-container">
      <div className="step-label">// step_01 › project_information</div>

      <h2 className="step-title">Enter project details</h2>

      <p className="step-sub">
        These details will appear on your generated document.
      </p>

      <form onSubmit={handleSubmit} className="step-form">

        {/* university */}

        <div className="form-section">

          <div className="form-section-label">
            <span className="form-section-bullet">▸</span>
            university
          </div>

          <div className="form-row">
            <div
              className="form-field"
              style={{ gridColumn: "1 / -1" }}
            >
              <label>college_logo</label>

              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleLogo}
              />

              <label
                htmlFor="logo-upload"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  padding: "10px 14px",
                  border: logoPreview
                    ? "1px solid rgba(99,179,237,.3)"
                    : "1px dashed rgba(255,255,255,.15)",
                  borderRadius: 8,
                  background: logoPreview
                    ? "rgba(99,179,237,.05)"
                    : "transparent",
                }}
              >
                {logoPreview ? (
                  <>
                    <img
                      src={`${import.meta.env.VITE_API_URL || "http://localhost:8080"}${logoPreview}`}
                      alt="logo"
                      style={{
                        height: 40,
                        objectFit: "contain",
                        borderRadius: 4,
                      }}
                    />

                    <span
                      style={{
                        fontSize: ".8rem",
                        opacity: .5,
                      }}
                    >
                      click to change
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      fontSize: ".85rem",
                      opacity: .45,
                    }}
                  >
                    ⬆ Upload college logo
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="form-row">

            <div className="form-field">
              <label>university</label>

              <input
                placeholder="university Name"
                value={data.university}
                onChange={(e) =>
                  update({
                    university: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-field">
              <label>department</label>

              <input
                placeholder="Department"
                value={data.department}
                onChange={(e) =>
                  update({
                    department: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-field">
              <label>academic_year</label>

              <input
                placeholder="2024-2028"
                value={data.academicYear}
                onChange={(e) =>
                  update({
                    academicYear: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-field">
              <label>semester</label>

              <select
                value={data.semester}
                onChange={(e) =>
                  update({
                    semester: e.target.value,
                  })
                }
              >
                <option value="">Select semester</option>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} Semester
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* Subject */}

        <div className="form-section">

          <div className="form-section-label">
            <span className="form-section-bullet">▸</span>
            subject
          </div>

          <div className="form-row">

            <div className="form-field">

              <label>subject</label>

              <input
                placeholder="Data Structures"
                value={data.subject}
                onChange={(e) =>
                  update({
                    subject: e.target.value,
                  })
                }
              />

            </div>

            <div className="form-field">

              <label>subject_code</label>

              <input
                placeholder="BCS101"
                value={data.subjectCode}
                onChange={(e) =>
                  update({
                    subjectCode: e.target.value,
                  })
                }
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-field">

              <label>course</label>

              <input
                placeholder="B.Tech"
                value={data.course}
                onChange={(e) =>
                  update({
                    course: e.target.value,
                  })
                }
              />

            </div>

            <div className="form-field">

              <label>language</label>

              <select
                value={data.language}
                onChange={(e) =>
                  update({
                    language: e.target.value,
                  })
                }
              >

                <option value="">
                  Select language
                </option>

                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* NEW PROFILE */}

          <div className="form-row">

            <div className="form-field">

              <label>profile</label>

              <select
                value={data.profile}
                onChange={(e) =>
                  update({
                    profile: e.target.value,
                  })
                }
              >

                {PROFILES.map(profile => (
                  <option
                    key={profile.value}
                    value={profile.value}
                  >
                    {profile.label}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* Student */}

        <div className="form-section">

          <div className="form-section-label">
            <span className="form-section-bullet">▸</span>
            student & faculty
          </div>

          <div className="form-row">

            <div className="form-field">

              <label>student_name</label>

              <input
                placeholder="Student Name"
                value={data.studentName}
                onChange={(e) =>
                  update({
                    studentName: e.target.value,
                  })
                }
              />

            </div>

            <div className="form-field">

              <label>enrollment_number</label>

              <input
                placeholder="Enrollment Number"
                value={data.rollNumber}
                onChange={(e) =>
                  update({
                    rollNumber: e.target.value,
                  })
                }
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-field">

              <label>submitted_to</label>

              <input
                placeholder="Professor Name"
                value={data.submittedTo}
                onChange={(e) =>
                  update({
                    submittedTo: e.target.value,
                  })
                }
              />

            </div>

            <div className="form-field">

              <label>designation</label>

              <input
                placeholder="Assistant Professor"
                value={data.designation}
                onChange={(e) =>
                  update({
                    designation: e.target.value,
                  })
                }
              />

            </div>

          </div>

        </div>

        <div className="step-actions right">
          <button
            type="submit"
            className="btn-primary-lg"
          >
            Next →
          </button>
        </div>

      </form>

    </div>
  );
}