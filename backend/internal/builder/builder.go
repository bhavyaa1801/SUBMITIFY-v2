package builder

import "github.com/bhavyaa1801/submitify-v2/internal/models"

type QuestionContent struct {
	Number   int
	Question string

	Sections map[string]string
}

type Builder struct{}

func New() *Builder {
	return &Builder{}
}

func (b *Builder) Build(
	metadata models.Metadata,
	profile models.Profile,
	questions []QuestionContent,
) models.Document {

	def := models.GetProfileDefinition(profile)

	doc := models.Document{
		Metadata: metadata,
		Profile:  profile,
	}

	for _, q := range questions {

		exp := models.Experiment{
			Number:   q.Number,
			Question: q.Question,
		}

		// Automatically create Aim from the original question
		// for Programming profile.
		if profile == models.Programming {
			exp.Sections = append(exp.Sections, models.Section{
				Title:   "Aim",
				Type:    models.Paragraph,
				Content: q.Question,
			})
		}

		// AI-generated sections
		for _, secDef := range def.Sections {

			content := q.Sections[secDef.Title]

			exp.Sections = append(exp.Sections, models.Section{
				Title:   secDef.Title,
				Type:    secDef.Type,
				Content: content,
			})
		}

		doc.Experiments = append(doc.Experiments, exp)
	}

	return doc
}