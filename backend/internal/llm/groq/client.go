package groq

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

const baseURL = "https://api.groq.com/openai/v1/chat/completions"

type Client struct {
	apiKey string
	model  string
	client *http.Client
}

func New(apiKey, model string) *Client {
	return &Client{
		apiKey: apiKey,
		model:  model,
		client: &http.Client{
			Timeout: 60 * time.Second,
		},
	}
}

func (c *Client) Generate(prompt string) (string, error) {

	request := ChatRequest{
		Model: c.model,
		Messages: []Message{
			{
				Role:    "user",
				Content: prompt,
			},
		},
		Temperature: 0.2,
	}

	body, err := json.Marshal(request)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest(http.MethodPost, baseURL, bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errorBody bytes.Buffer
		errorBody.ReadFrom(resp.Body)

		return "", fmt.Errorf(
			"groq API error (%d): %s",
			resp.StatusCode,
			errorBody.String(),
		)
	}

	var response ChatResponse

	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}

	if len(response.Choices) == 0 {
		return "", fmt.Errorf("groq returned no choices")
	}

	return response.Choices[0].Message.Content, nil
}