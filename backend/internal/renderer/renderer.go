package renderer

import (
	"bytes"
	"fmt"
	"html/template"
	"strings"
	"os"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type Renderer struct{}

func New() *Renderer {
	return &Renderer{}
}

type LayoutData struct {
    CSS     template.CSS
    Content template.HTML
}

func (r *Renderer) RenderDocument(doc models.Document) (string, error) {

	cover, err := r.renderCover(doc.Metadata)
	if err != nil {
		return "", err
	}

	index, err := r.renderIndex(doc.Experiments)
	if err != nil {
		return "", err
	}

	var experiments strings.Builder

	for _, exp := range doc.Experiments {

		html, err := r.renderExperiment(exp)
		if err != nil {
			return "", err
		}

		experiments.WriteString(html)
	}

	content := template.HTML(
		cover + index + experiments.String(),
	)

	return r.renderLayout(content)
}

func (r *Renderer) renderTemplate(templateFile string, data any) (string, error) {

	tmpl, err := template.ParseFiles(templateFile)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer

	err = tmpl.Execute(&buf, data)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

func (r *Renderer) renderCover(metadata models.Metadata) (string, error) {
	return r.renderTemplate("templates/cover.html", metadata)
}

func (r *Renderer) renderLayout(content template.HTML) (string, error) {

	css, err := os.ReadFile("static/style.css")
	if err != nil {
		return "", err
	}

	data := struct {
		CSS     template.CSS
		Content template.HTML
	}{
		CSS:     template.CSS(string(css)),
		Content: content,
	}

	return r.renderTemplate(
		"templates/layout.html",
		data,
	)
}

func (r *Renderer) renderExperiment(exp models.Experiment) (string, error) {

	var sections strings.Builder

	for _, section := range exp.Sections {
		sections.WriteString(
			string(r.renderSection(section)),
		)
	}

	data := struct {
		Number       int
		Question     string
		SectionsHTML template.HTML
	}{
		Number:       exp.Number,
		Question:     exp.Question,
		SectionsHTML: template.HTML(sections.String()),
	}

	return r.renderTemplate("templates/experiment.html", data)
}

func (r *Renderer) renderSection(section models.Section) template.HTML {

	switch section.Type {

	case models.Paragraph:

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2>%s</h2>

<p>%s</p>

</section>
`,
			template.HTMLEscapeString(section.Title),
			template.HTMLEscapeString(section.Content),
		))

	case models.Code:

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2>%s</h2>

<pre class="code">%s</pre>

</section>
`,
			template.HTMLEscapeString(section.Title),
			template.HTMLEscapeString(section.Content),
		))

	case models.Table:

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2>%s</h2>

%s

</section>
`,
			template.HTMLEscapeString(section.Title),
			section.Content,
		))

	case models.List:

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2>%s</h2>

<p>%s</p>

</section>
`,
			template.HTMLEscapeString(section.Title),
			template.HTMLEscapeString(section.Content),
		))

	case models.Equation:

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2>%s</h2>

<p>%s</p>

</section>
`,
			template.HTMLEscapeString(section.Title),
			template.HTMLEscapeString(section.Content),
		))

	default:

		return ""
	}
}

func (r *Renderer) renderIndex(experiments []models.Experiment) (string, error) {

	return r.renderTemplate(
		"templates/index.html",
		experiments,
	)

}
