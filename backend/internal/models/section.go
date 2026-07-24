package models

type SectionType string

const (
	Paragraph SectionType = "paragraph"
	Code      SectionType = "code"
	Image     SectionType = "image"

	Table     SectionType = "table"
	List      SectionType = "list"
	Equation  SectionType = "equation"
)

type Section struct {

	Title string `json:"title"`
	Type SectionType `json:"type"`
	Content string `json:"content"`
	Style SectionStyle `json:"style,omitempty"`
}

