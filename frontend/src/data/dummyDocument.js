const dummyDocument = {
    metadata: {
        institution: "IGDTUW",
        department: "Computer Science Engineering",
        academicYear: "2025-26",
        semester: "V",

        subject: "Data Structures",
        subjectCode: "CSE201",
        course: "B.Tech",

        studentName: "Bhavya Rajput",
        enrollmentNo: "0123456789",

        submittedTo: "Dr. XYZ",
        designation: "Assistant Professor",

        language: "English",
    },

    experiments: [
        {
            number: 1,

            question: "Write a program to reverse a linked list.",

            date: "",

            signature: "",

            sections: [


                {
                    title: "Algorithm",
                    type: "paragraph",
                    content:
                        "1. Initialize pointers...\n2. Reverse links..."
                },

                {
                    title: "Source Code",
                    type: "code",
                    content:
                        `#include<iostream>
using namespace std;
int main(){

}`
                },

                {
                    title: "Output",
                    type: "paragraph",
                    content:
                        "Linked List Reversed Successfully"
                }

            ]

        }
    ]
};

export default dummyDocument;