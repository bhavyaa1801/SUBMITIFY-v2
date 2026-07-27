package metrics

import (
	"fmt"
	"strings"
	"time"
)

func LogGeneration(
	questionNumber int,
	attempt int,
	duration time.Duration,
	err error,
) {
	fmt.Println(strings.Repeat("-", 50))

	fmt.Printf("Question : #%d\n", questionNumber)
	fmt.Printf("Attempt  : %d\n", attempt)
	fmt.Printf("Duration : %v\n", duration.Round(time.Millisecond))

	if err != nil {
		fmt.Println("Status   : FAILED")
		fmt.Printf("Error    : %v\n", err)
	} else {
		fmt.Println("Status   : SUCCESS")
	}

	fmt.Println(strings.Repeat("-", 50))
}