import { useState } from "react";

import StepProjectInfo from "../components/steps/StepProjectInfo";
import StepQuestions from "../components/steps/StepQuestions";
import StepQuestionReview from "../components/steps/StepQuestionReview";

import GeneratingScreen from "../components/GeneratingScreen";
import DocumentEditor from "../components/DocumentEditor";

import FloatingCode from "../components/FloatingCode";

import { exportPDF } from "../services/export";
import {
    parseQuestions,
    generateDocument,
} from "../services/generate";

const STEPS = [
  "Project Info",
  "Question Sheet",
  "Review",
];

export default function CreateDocumentPage() {

  const [step, setStep] = useState(0);

  const [status, setStatus] = useState("form");
  // form | generating | editing

  const [document, setDocument] = useState(null);

  const [formData, setFormData] = useState({

    // Institution
    institution: "",
    department: "",
    academicYear: "",
    semester: "",

    // Subject
    subject: "",
    subjectCode: "",
    course: "",

    // Student
    studentName: "",
    enrollmentNo: "",
    submittedTo: "",
    designation: "",

    // Document
    language: "",
    profile: "programming",
    logo: null,

    // Questions
    rawQuestions: "",
    questions: [],
  });

  const update = (fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const handleParse = async () => {

    try {
        const result = await parseQuestions(
            formData.rawQuestions
        );
        update({
            questions: result.questions,
        });
        setStep(2);
    } catch (err) {
        console.error(err);
        alert("Unable to parse question sheet.");

    }

};

  const handleGenerate = async () => {

    setStatus("generating");

    const payload = {

      metadata: {

        institution: formData.institution,
        department: formData.department,
        academicYear: formData.academicYear,
        semester: formData.semester,

        subject: formData.subject,
        subjectCode: formData.subjectCode,
        course: formData.course,

        studentName: formData.studentName,
        enrollmentNo: formData.enrollmentNo,

        submittedTo: formData.submittedTo,
        designation: formData.designation,

        language: formData.language,
        

        logo: formData.logo,
      },
      profile: formData.profile,
      questions: formData.questions,
    };

    try {

      const doc = await generateDocument(payload);

      setDocument(doc);

      setStatus("editing");

    } catch (err) {

      console.error(err);

      setStatus("form");

      alert("Failed to generate document.");
    }
  };


  if (status === "generating") {
    return <GeneratingScreen />;
  }

  if (status === "editing" && document) {

    return (

      <DocumentEditor
        document={document}
        onExport={exportPDF}
        setDocument={setDocument}
        onBack={() => {
          setStatus("form");
          setStep(2);
        }}
      />

    );

  }

  return (

    <div className="cp-root">

      <FloatingCode />

      {/* Stepper */}

      <div className="cp-topbar">

        <div className="cp-stepper">

          {STEPS.map((label, i) => (

            <div
              key={label}
              className={`cp-step ${
                i < step
                  ? "done"
                  : i === step
                  ? "active"
                  : ""
              }`}
            >

              <span className="cp-step-num">
                {i < step ? "✓" : i + 1}
              </span>

              <span className="cp-step-label">
                {label}
              </span>

              {i < STEPS.length - 1 && (
                <span className="cp-step-sep">
                  ——
                </span>
              )}

            </div>

          ))}

        </div>

      </div>

      {/* Body */}

      <div className="cp-body">

        <div className="cp-code-bg-subtle" />

        {step === 0 && (

          <StepProjectInfo
            data={formData}
            update={update}
            onNext={() => setStep(1)}
          />

        )}

        {step === 1 && (

          <StepQuestions
            data={formData}
            update={update}
            onBack={() => setStep(0)}
            onParse={handleParse}
          />

        )}

        {step === 2 && (

          <StepQuestionReview
            data={formData}
            update={update}
            onBack={() => setStep(1)}
            onGenerate={handleGenerate}
          />

        )}

      </div>

    </div>

  );

}