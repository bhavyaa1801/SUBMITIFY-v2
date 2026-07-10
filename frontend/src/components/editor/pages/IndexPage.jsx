import "./IndexPage.css";
import EditableParagraph from "../blocks/EditableParagraph";
import { useDocument } from "../context/DocumentContext";

export default function IndexPage() {

    const {
        document,
        updateExperiment,
        updateExperimentField,
    } = useDocument();

    return (

        <div className="index-page">

            <EditableParagraph
                tag="h2"
                className="index-heading"
                value="Index"
                onChange={() => {}}
            />

            <table className="index-table">

                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "60%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                </colgroup>

                <thead>

                    <tr>

                        <th>

                            <EditableParagraph
                                tag="span"
                                value="E. No."
                                onChange={() => {}}
                            />

                        </th>

                        <th>

                            <EditableParagraph
                                tag="span"
                                value="Aim"
                                onChange={() => {}}
                            />

                        </th>

                        <th>

                            <EditableParagraph
                                tag="span"
                                value="Date"
                                onChange={() => {}}
                            />

                        </th>

                        <th>

                            <EditableParagraph
                                tag="span"
                                value="Sign"
                                onChange={() => {}}
                            />

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {document.experiments.map((exp, index) => (

                        <tr key={index}>

                            <td className="center">

                                <EditableParagraph
                                    tag="span"
                                    value={String(exp.number)}
                                    onChange={(value) =>
                                        updateExperiment(
                                            index,
                                            {
                                                number:
                                                    Number(value) || exp.number,
                                            }
                                        )
                                    }
                                />

                            </td>

                            <td>

                                <EditableParagraph
                                    tag="span"
                                    value={exp.question}
                                    onChange={(value) =>
                                        updateExperiment(
                                            index,
                                            {
                                                question: value,
                                            }
                                        )
                                    }
                                />

                            </td>

                            <td>

                                <EditableParagraph
                                    tag="span"
                                    value={exp.date ?? ""}
                                    onChange={(value) =>
                                        updateExperimentField(
                                            index,
                                            "date",
                                            value
                                        )
                                    }
                                />

                            </td>

                            <td>

                                <EditableParagraph
                                    tag="span"
                                    value={exp.signature ?? ""}
                                    onChange={(value) =>
                                        updateExperimentField(
                                            index,
                                            "signature",
                                            value
                                        )
                                    }
                                />

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}