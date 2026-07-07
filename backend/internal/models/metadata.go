package models

type Metadata struct {
	University   string `json:"university"`
	AcademicYear string `json:"academic_year"`

	Department string `json:"department"`

	Subject     string `json:"subject"`
	SubjectCode string `json:"subject_code"`

	Course   string `json:"course"`
	Semester string `json:"semester"`

	Language string `json:"language"`

	StudentName string `json:"student_name"`
	RollNumber  string `json:"roll_number"`

	SubmittedTo string `json:"submitted_to"`
	Designation string `json:"designation"`

	Logo string `json:"logo,omitempty"`
}