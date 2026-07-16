package renderer

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"strings"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type Renderer struct {
	serverURL string
}

func New(serverURL string) *Renderer {
	return &Renderer{
		serverURL: serverURL,
	}
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

	if metadata.Logo != "" &&
		strings.HasPrefix(metadata.Logo, "/uploads/") {

		metadata.Logo = r.serverURL + metadata.Logo
	}

	html, err := r.renderTemplate(
		"templates/cover.html",
		metadata,
	)
	if err != nil {
		return "", err
	}

	return r.renderPage(template.HTML(html))
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

	return r.renderTemplate(
		"templates/experiment.html",
		data,
	)
}

func (r *Renderer) renderSection(section models.Section) template.HTML {

	switch section.Type {

	case models.Paragraph:

		titleStyle := styleToCSS(section.Style.Title)
		contentStyle := styleToCSS(section.Style.Content)

		content := template.HTMLEscapeString(section.Content)
		content = strings.ReplaceAll(content, "\n", "<br>")

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

<p style="%s">%s</p>

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),

			contentStyle,
			content,
		))

	case models.Code:

		titleStyle := styleToCSS(section.Style.Title)
		contentStyle := styleToCSS(section.Style.Content)

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

<pre class="code" style="%s">%s</pre>

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),

			contentStyle,
			template.HTMLEscapeString(section.Content),
		))

	case models.Image:

		titleStyle := styleToCSS(section.Style.Title)
		contentStyle := styleToCSS(section.Style.Content)

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

<img
	src="%s"
	style="%s"
/>

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),
			template.HTMLEscapeString(section.Content),
			contentStyle,
		))

	case models.Table:

		titleStyle := styleToCSS(section.Style.Title)

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

%s

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),
			section.Content,
		))

	case models.List:

		titleStyle := styleToCSS(section.Style.Title)
		contentStyle := styleToCSS(section.Style.Content)

		content := template.HTMLEscapeString(section.Content)
		content = strings.ReplaceAll(content, "\n", "<br>")

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

<p style="%s">%s</p>

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),

			contentStyle,
			content,
		))

	case models.Equation:

		titleStyle := styleToCSS(section.Style.Title)
		contentStyle := styleToCSS(section.Style.Content)

		content := template.HTMLEscapeString(section.Content)
		content = strings.ReplaceAll(content, "\n", "<br>")

		return template.HTML(fmt.Sprintf(`
<section class="doc-section">

<h2 style="%s">%s</h2>

<p style="%s">%s</p>

</section>
`,
			titleStyle,
			template.HTMLEscapeString(section.Title),

			contentStyle,
			content,
		))

	default:

		return ""

	}
}

func (r *Renderer) renderIndex(experiments []models.Experiment) (string, error) {

	
	html, err := r.renderTemplate(
		"templates/index.html",
		experiments,
	)
	if err != nil {
		return "", err
	}

	return r.renderPage(template.HTML(html))

}

func (r *Renderer) renderPage(content template.HTML) (string, error) {

	return r.renderTemplate(
		"templates/page.html",
		struct {
			Content template.HTML
		}{
			Content: content,
		},
	)
}

func styleToCSS(style models.TextStyle) string {

	var css []string

	if style.Bold {
		css = append(css, "font-weight:bold")
	}

	if style.Italic {
		css = append(css, "font-style:italic")
	}

	if style.Underline {
		css = append(css, "text-decoration:underline")
	}

	if style.FontSize > 0 {
		css = append(css,
			fmt.Sprintf("font-size:%dpx", style.FontSize),
		)
	}

	if style.Align != "" {
		css = append(css,
			fmt.Sprintf("text-align:%s", style.Align),
		)
	}

	if style.Width > 0 {
		css = append(css,
			fmt.Sprintf("width:%dpx", style.Width),
		)
	}

	if style.Align == "center" {
		css = append(css,
			"display:block",
			"margin-left:auto",
			"margin-right:auto",
		)
	}

	return strings.Join(css, ";")

}

