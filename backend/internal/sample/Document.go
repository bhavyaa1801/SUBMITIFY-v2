package sample

import "github.com/bhavyaa1801/submitify-v2/internal/models"

func NewProgrammingDocument() models.Document {

	return models.Document{
		ID: "demo-document",

		Metadata: models.Metadata{
			University:   "Indira Gandhi Delhi Technical University",
			AcademicYear: "2025-26",
			Department:   "Computer Science",

			Subject:     "Data Structures",
			SubjectCode: "BCS101",

			Course:   "B.Tech",
			Semester: "3",

			Language: "C++",

			StudentName: "Bhavya Rajput",
			RollNumber:  "2200XXXXXX",

			SubmittedTo: "Prof. XYZ",
			Designation: "Assistant Professor",
		},

		Profile: models.Programming,

		Experiments: []models.Experiment{
			{
				Number:   1,
				Question: "Implement Bubble Sort",

				Sections: []models.Section{
					{
						Title:   "Aim",
						Type:    models.Paragraph,
						Content: "To implement Bubble Sort.",
						
					},
					{
						Title:   "Algorithm",
						Type:    models.Paragraph,
						Content: "1. Compare adjacent elements.\n2. Swap if required.",
						
					},
					{
						Title:   "Source Code",
						Type:    models.Code,
						Content: "#include<iostream>\nint main(){return 0;}",
						
					},
					{
						Title:   "Output",
						Type:    models.Paragraph,
						Content: "Sorted Array",
						
					},
				},
			},
		},
	}
}