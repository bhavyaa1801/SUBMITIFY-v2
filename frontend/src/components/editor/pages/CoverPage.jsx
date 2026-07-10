import "./CoverPage.css";
import { useDocument } from "../context/DocumentContext";
import EditableParagraph from "../blocks/EditableParagraph";

export default function CoverPage() {

    const {
        document,
        updateMetadata,
    } = useDocument();

    const metadata = document.metadata;

    const {
        institution,
        department,
        academicYear,

        subject,
        subjectCode,

        studentName,
        enrollmentNo,

        submittedTo,
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
                value={institution}
                onChange={(value) =>
                    updateMetadata("institution", value)
                }
            />

            {logo ? (

                <img
                    src={logo}
                    alt="University Logo"
                    className="logo"
                />

            ) : (

                <div className="logo-placeholder">
                    LOGO
                </div>

            )}

            <p className="year">

                Academic Year:{" "}

                <EditableParagraph
                    tag="span"
                    value={academicYear}
                    onChange={(value) =>
                        updateMetadata("academicYear", value)
                    }
                />

            </p>

            <EditableParagraph
                tag="p"
                className="department"
                value={department}
                onChange={(value) =>
                    updateMetadata("department", value)
                }
            />

            <EditableParagraph
                tag="h2"
                className="subject"
                value={subject}
                onChange={(value) =>
                    updateMetadata("subject", value)
                }
            />

            <EditableParagraph
                tag="h2"
                value="Practical File"
                onChange={() => {}}
            />

            <p className="subject-code">

                (Subject Code:{" "}

                <EditableParagraph
                    tag="span"
                    value={subjectCode}
                    onChange={(value) =>
                        updateMetadata("subjectCode", value)
                    }
                />

                )

            </p>

            <table className="submission-table">

                <tbody>

                    <tr>

                        <td className="left">

                            <strong>

                                <EditableParagraph
                                    tag="span"
                                    value="Submitted to :"
                                    onChange={() => {}}
                                />

                            </strong>

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={submittedTo}
                                onChange={(value) =>
                                    updateMetadata("submittedTo", value)
                                }
                            />

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={designation}
                                onChange={(value) =>
                                    updateMetadata("designation", value)
                                }
                            />

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={department}
                                onChange={(value) =>
                                    updateMetadata("department", value)
                                }
                            />

                        </td>

                        <td className="right">

                            <strong>

                                <EditableParagraph
                                    tag="span"
                                    value="Submitted by :"
                                    onChange={() => {}}
                                />

                            </strong>

                            <br />

                            <EditableParagraph
                                tag="span"
                                value={studentName}
                                onChange={(value) =>
                                    updateMetadata("studentName", value)
                                }
                            />

                            <br />

                            Enrollment No:{" "}

                            <EditableParagraph
                                tag="span"
                                value={enrollmentNo}
                                onChange={(value) =>
                                    updateMetadata("enrollmentNo", value)
                                }
                            />

                            <br />

                            Course:{" "}

                            <EditableParagraph
                                tag="span"
                                value={course}
                                onChange={(value) =>
                                    updateMetadata("course", value)
                                }
                            />

                            <br />

                            Semester:{" "}

                            <EditableParagraph
                                tag="span"
                                value={semester}
                                onChange={(value) =>
                                    updateMetadata("semester", value)
                                }
                            />

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}