package metrics

import (
	"fmt"
	"time"
)

func LogCacheHit(
	question string,
	subject string,
	profile string,
	duration time.Duration,
) {

	fmt.Println("--------------------------------------------------")
	fmt.Println("CACHE HIT")
	fmt.Println("--------------------------------------------------")
	fmt.Printf("Question : %s\n", question)
	fmt.Printf("Subject  : %s\n", subject)
	fmt.Printf("Profile  : %s\n", profile)
	fmt.Printf("Lookup   : %v\n", duration)
	fmt.Println("--------------------------------------------------")
}

func LogCacheMiss(
	question string,
	subject string,
	profile string,
	duration time.Duration,
) {

	fmt.Println("--------------------------------------------------")
	fmt.Println("CACHE MISS")
	fmt.Println("--------------------------------------------------")
	fmt.Printf("Question : %s\n", question)
	fmt.Printf("Subject  : %s\n", subject)
	fmt.Printf("Profile  : %s\n", profile)
	fmt.Printf("Lookup   : %v\n", duration)
	fmt.Println("--------------------------------------------------")
}

func LogCacheSave(
	question string,
	subject string,
	profile string,
	duration time.Duration,
) {

	fmt.Println("--------------------------------------------------")
	fmt.Println("CACHE SAVE")
	fmt.Println("--------------------------------------------------")
	fmt.Printf("Question : %s\n", question)
	fmt.Printf("Subject  : %s\n", subject)
	fmt.Printf("Profile  : %s\n", profile)
	fmt.Printf("Duration : %v\n", duration)
	fmt.Println("--------------------------------------------------")
}