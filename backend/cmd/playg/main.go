package main

import (
	"fmt"
	"os"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/config"
	"github.com/bhavyaa1801/submitify-v2/internal/expoter/pdf"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/groq"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
)

func main() {

	//------------------------------------
	// Load Config
	//------------------------------------

	cfg := config.Load()

	//------------------------------------
	// Create LLM Client
	//------------------------------------

	llm := groq.New(
		cfg.GroqAPIKey,
		cfg.GroqModel,
	)

	//------------------------------------
	// Create Generator
	//------------------------------------

	gen := generator.New(llm)

	//------------------------------------
	// Select Profile
	//------------------------------------

	profile := models.GetProfileDefinition(models.Programming)

	//------------------------------------
	// Generate AI Content
	//------------------------------------

	content, err := gen.Generate(
		1,
		"Write a Go program to add two numbers.",
		profile,
	)
	if err != nil {
		panic(err)
	}

	fmt.Println("✅ AI Generation Successful")

	//------------------------------------
	// Metadata
	//------------------------------------

	metadata := models.Metadata{
		University:   "IGDTUW",
		AcademicYear: "2025-26",
		Department:   "Computer Science & Engineering",
		Subject:      "Go Programming",
		SubjectCode:  "CS301",
		Course:       "B.Tech",
		Semester:     "5",
		Language:     "Go",
		StudentName:  "Bhavya Rajput",
		RollNumber:   "000000",
		SubmittedTo:  "Faculty",
		Designation:  "Assistant Professor",
	}

	//------------------------------------
	// Build Document
	//------------------------------------

	docBuilder := builder.New()

	document := docBuilder.Build(
		metadata,
		models.Programming,
		[]builder.QuestionContent{
			content,
		},
	)

	fmt.Println("✅ Document Built")

	//------------------------------------
	// Render HTML
	//------------------------------------

	r := renderer.New()

	html, err := r.RenderDocument(document)
	if err != nil {
		panic(err)
	}

	err = os.WriteFile("playground.html", []byte(html), 0644)
	if err != nil {
		panic(err)
	}

	fmt.Println("✅ HTML Generated")

	//------------------------------------
	// Export PDF
	//------------------------------------

	exporter := pdf.New("wkhtmltopdf")

	pdfBytes, err := exporter.Export(html)
	if err != nil {
		panic(err)
	}

	err = os.WriteFile("playground.pdf", pdfBytes, 0644)
	if err != nil {
		panic(err)
	}

	fmt.Println("✅ PDF Generated Successfully")
}