package models

type Experiment struct {
	Number   int       `json:"number"`
	Question string    `json:"question"`
	Sections []Section `json:"sections"`
}