package generator

import (
	"encoding/json"
	"fmt"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/llm"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/promt"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type Generator struct {
	llm llm.Client
}

func New(client llm.Client) *Generator {
	return &Generator{
		llm: client,
	}
}

func (g *Generator) Generate(
	number int,
	question string,
	profile models.ProfileDefinition,
) (builder.QuestionContent, error) {

	p, err := prompt.BuildGeneratorPrompt(prompt.GeneratorPrompt{
		Question: question,
		Profile:  profile,
	})
	if err != nil {
		return builder.QuestionContent{}, err
	}

	response, err := g.llm.Generate(p)
	// fmt.Println("========== RAW AI RESPONSE ==========")
	// fmt.Println(response)
	// fmt.Println("=====================================")

	// fmt.Println("PROFILE:", profile.Name)

	// for _, s := range profile.Sections {
	// 	fmt.Println("SECTION:", s.Title)
	// }

	
	if err != nil {
		return builder.QuestionContent{}, err
	}

	sections := make(map[string]string)

	if err := json.Unmarshal([]byte(response), &sections); err != nil {
		return builder.QuestionContent{}, fmt.Errorf(
			"invalid JSON returned by AI: %w",
			err,
		)
	}

	return builder.QuestionContent{
		Number:   number,
		Question: question,
		Sections: sections,
	}, nil
}
