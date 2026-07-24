package models

type Document struct {
	ID string `json:"id"`    // chnage to uuid for postgresql

	Metadata Metadata `json:"metadata"`

	Profile Profile `json:"profile"`

	Experiments []Experiment `json:"experiments"`
}


