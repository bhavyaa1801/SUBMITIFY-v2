import { useState } from "react";

export default function StepQuestions({
    data,
    update,
    onBack,
    onParse,
}) {

    const [count, setCount] = useState(
        data.rawQuestions?.length || 0
    );

    const handleChange = (e) => {

        update({
            rawQuestions: e.target.value,
        });

        setCount(e.target.value.length);
    };

    return (

        <div className="step-container">

            <div className="step-label">
                // step_02 › question_sheet
            </div>

            <h2 className="step-title">
                Paste Question Sheet
            </h2>

            <p className="step-sub">
                Paste the questions as provided by your faculty - make sure to mark ques properly                               
                IN THE FORMAT - [ 1. 2. 3. and so on]
            </p>

            <div
                style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12,
                    padding: 18,
                }}
            >

                <textarea

                    className="exp-input"

                    rows={12}

                    placeholder={`Example:

1. Write a program to implement Bubble Sort.

2. Implement Binary Search Tree.

3. Write SQL queries for Employee database.

Paste the complete question sheet here...`}

                    value={data.rawQuestions}

                    onChange={handleChange}

                    style={{
                        width: "100%",
                        resize: "vertical",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "inherit",
                        fontFamily: "inherit",
                        fontSize: ".9rem",
                        lineHeight: 1.7,
                    }}

                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 12,
                        fontSize: ".75rem",
                        opacity: .55,
                    }}
                >

                    <span>
                        Backend parser will detect individual questions.
                    </span>

                    <span>
                        {count} characters
                    </span>

                </div>

            </div>

            <div className="step-actions between">

                <button
                    className="btn-ghost"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <button
                    className="btn-primary-lg"
                    disabled={!data.rawQuestions.trim()}
                    onClick={onParse} 
                >
                    Parse Questions →
                </button>

            </div>

        </div>

    );

}