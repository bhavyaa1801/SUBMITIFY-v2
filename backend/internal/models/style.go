package models

type TextStyle struct {
	Bold      bool   `json:"bold,omitempty"`
	Italic    bool   `json:"italic,omitempty"`
	Underline bool   `json:"underline,omitempty"`

	FontSize int    `json:"fontSize,omitempty"`
	Align    string `json:"align,omitempty"`

	Width int `json:"width,omitempty"`
}

type SectionStyle struct {
	Title   TextStyle `json:"title,omitempty"`
	Content TextStyle `json:"content,omitempty"`
}