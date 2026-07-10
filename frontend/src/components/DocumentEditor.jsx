// import { useState } from "react";

// export default function DocumentEditor({
//   document,
//   onExport,
// }) {
//   const [doc, setDoc] = useState(document);

//   const updateSection = (expIndex, sectionIndex, value) => {
//     const updated = structuredClone(doc);

//     updated.experiments[expIndex].sections[sectionIndex].content = value;

//     setDoc(updated);
//   };

//   if (!doc) {
//     return (
//       <div className="step-container">
//         <h2>No document loaded.</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="step-container">

//       <div className="step-label">
//         // step_04 › document_editor
//       </div>

//       <h2 className="step-title">
//         Edit Document
//       </h2>

//       <p className="step-sub">
//         Review and edit the generated document before exporting.
//       </p>

//       {doc.experiments.map((experiment, expIndex) => (

//         <div
//           key={expIndex}
//           className="review-box"
//           style={{ marginBottom: 28 }}
//         >

//           <h3>
//             Experiment {experiment.number}
//           </h3>

//           <p
//             style={{
//               opacity: .8,
//               marginBottom: 20,
//             }}
//           >
//             {experiment.question}
//           </p>

//           {experiment.sections.map((section, sectionIndex) => (

//             <div
//               key={sectionIndex}
//               style={{
//                 marginBottom: 22,
//               }}
//             >

//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: 8,
//                   fontWeight: 600,
//                 }}
//               >
//                 {section.title}
//               </label>

//               {
//                 section.type === "code"
//                 ? (
//                   <textarea
//                     rows={12}
//                     className="exp-input"
//                     value={section.content}
//                     onChange={(e)=>
//                       updateSection(
//                         expIndex,
//                         sectionIndex,
//                         e.target.value
//                       )
//                     }
//                     style={{
//                       fontFamily: "monospace",
//                     }}
//                   />
//                 )
//                 : (
//                   <textarea
//                     rows={5}
//                     className="exp-input"
//                     value={section.content}
//                     onChange={(e)=>
//                       updateSection(
//                         expIndex,
//                         sectionIndex,
//                         e.target.value
//                       )
//                     }
//                   />
//                 )
//               }

//             </div>

//           ))}

//         </div>

//       ))}

    //   <div className="step-actions right">

    //     <button
    //       className="btn-primary-lg"
    //       onClick={() => onExport(doc)}
    //     >
    //       Export PDF →
    //     </button>

    //   </div>

//     </div>
//   );
// }