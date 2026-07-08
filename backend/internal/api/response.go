package api

type GenerateResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

// this is the res for api /generate wali  in llm it was for the llm 