package main

import (
	"fmt"

	"github.com/bhavyaa1801/submitify-v2/internal/parser/question"
)

func main() {

	testCases := []struct {
		name string
		raw  string
	}{
		{
			name: "Normal Questions",
			raw: `
1. Write a C program.

2. Explain TCP.

3. Explain UDP.
`,
		},
		{
			name: "Multiline Question",
			raw: `
1. Write a C program.

Take input from the user.
Print the output.

2. Explain Stack.
`,
		},
		{
			name: "Floating Point",
			raw: `
1. Find the value of π = 3.14159.

2. Explain TCP.
`,
		},
		{
			name: "Wrong Numbering",
			raw: `
5. Binary Search

8. Merge Sort

12. BFS
`,
		},
		{
			name: "Year Inside Question",
			raw: `
1. Write a program.

2025 was the release year.

2. Explain Stack.
`,
		},
		{
			name: "IP Address",
			raw: `
1. Write a program.

2025 was the release year.

2. Explain Stack.
`,
		},
		{
			name: "Code Block",
			raw: `
1. Write a C program.

for(int i=0;i<10;i++){
	printf("%d", i);
}

2. Explain output.
`,
		},
		{
			name: "Question Format",
			raw: `
Question 1
Explain OSI.

Question 2
Explain DNS.
`,
		},
		{
			name: "Q Format",
			raw: `
Q1. Explain Stack.

Q2. Explain Queue.
`,
		},
	}

	parser := question.New(nil)

	for _, tc := range testCases {

		fmt.Println()
		fmt.Println("===================================================")
		fmt.Println("TEST:", tc.name)
		fmt.Println("===================================================")

		questions, err := parser.Parse(tc.raw)
		if err != nil {
			fmt.Println("ERROR:", err)
			continue
		}

		fmt.Printf("Parsed %d question(s)\n\n", len(questions))

		for _, q := range questions {
			fmt.Printf("[%d]\n", q.Number)
			fmt.Println(q.Text)
			fmt.Println("----------------------------------------")
		}
	}
}