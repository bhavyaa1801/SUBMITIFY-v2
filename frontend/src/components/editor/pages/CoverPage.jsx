import "./CoverPage.css";

import { useDocument } from "../context/DocumentContext";
import EditableParagraph from "../blocks/EditableParagraph";
import EditableImage from "../blocks/EditableImage";


export default function CoverPage() {

    const {
        document,
        updateMetadata,
    } = useDocument();

    const metadata = document.metadata;

    console.log(document.metadata)

    const {
        university,
        department,
        academic_year,

        subject,
        subject_code,

        student_name,
        roll_number,

        submitted_to,
        designation,

        course,
        semester,

        logo,
    } = metadata;

    return (

        <div className="cover">

            <EditableParagraph
                tag="h1"
                className="university"
                value={university}
                onChange={(value) =>
                    updateMetadata("university", value)
                }
            />

            <div className="cover-logo">

                <EditableImage
                    value={
                        logo
                            ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${logo}`
                            : ""
                    }
                    placeholder="LOGO"
                    style={{
                        width: 140,
                        align: "center",
                    }}
                    onChange={(value) =>
                        updateMetadata("logo", value)
                    }
                />

            </div>

            <p className="year">

                Academic Year:&nbsp;

                <EditableParagraph
                    tag="span"
                    value={academic_year}
                    onChange={(value) =>
                        updateMetadata(
                            "academic_year",
                            value
                        )
                    }
                />

            </p>

            <EditableParagraph
                tag="p"
                className="department"
                value={department}
                onChange={(value) =>
                    updateMetadata(
                        "department",
                        value
                    )
                }
            />

            <EditableParagraph
                tag="h2"
                className="subject"
                value={subject}
                onChange={(value) =>
                    updateMetadata(
                        "subject",
                        value
                    )
                }
            />

            <EditableParagraph
                tag="h2"
                className="practical-title"
                value="Practical File"
                onChange={() => { }}
            />

            <p className="subject-code">

                (

                Subject Code:&nbsp;

                <EditableParagraph
                    tag="span"
                    value={subject_code}
                    onChange={(value) =>
                        updateMetadata(
                            "subject_code",
                            value
                        )
                    }
                />

                )

            </p>

            <table className="submission-table">

                <tbody>

                    <tr>

                        <td className="left">

                            <strong>

                                Submitted to :

                            </strong>

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={submitted_to}
                                onChange={(value) =>
                                    updateMetadata(
                                        "submitted_to",
                                        value
                                    )
                                }
                            />

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={designation}
                                onChange={(value) =>
                                    updateMetadata(
                                        "designation",
                                        value
                                    )
                                }
                            />

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={department}
                                onChange={(value) =>
                                    updateMetadata(
                                        "department",
                                        value
                                    )
                                }
                            />

                        </td>

                        <td className="right">

                            <strong>

                                Submitted by :

                            </strong>

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={student_name}
                                onChange={(value) =>
                                    updateMetadata(
                                        "student_name",
                                        value
                                    )
                                }
                            />

                            <br />

                            Enrollment No:&nbsp;

                            <EditableParagraph
                                tag="span"
                                value={roll_number}
                                onChange={(value) =>
                                    updateMetadata(
                                        "roll_number",
                                        value
                                    )
                                }
                            />

                            <br />

                            Course:&nbsp;

                            <EditableParagraph
                                tag="span"
                                value={course}
                                onChange={(value) =>
                                    updateMetadata(
                                        "course",
                                        value
                                    )
                                }
                            />

                            <br />

                            Semester:&nbsp;

                            <EditableParagraph
                                tag="span"
                                value={semester}
                                onChange={(value) =>
                                    updateMetadata(
                                        "semester",
                                        value
                                    )
                                }
                            />

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}