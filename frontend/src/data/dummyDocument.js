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
                        "1. Initialize pointers...\n2. Reverse links...",

                    style: {

                        title: {

                            bold: true,
                            italic: false,
                            underline: false,

                            align: "left",

                            fontSize: 22,

                        },

                        content: {

                            bold: false,
                            italic: false,
                            underline: false,

                            align: "left",

                            fontSize: 16,

                        }

                    }
                },

                {
                    title: "Source Code",
                    type: "code",
                    content:
                        `#include<iostream>
using namespace std;
int main(){

}` ,

                    style: {

                        title: {

                            fontSize: 22,

                            bold: true,

                        },

                        content: {

                            fontSize: 15,

                            align: "left",

                        }

                    }
                },

                {
                    title: "Image",

                    type: "image",

                    content: "...",

                    style: {

                        title: {},

                        content: {

                            width: 350,

                        }

                    }

                },

                {
                    title: "Output",
                    type: "paragraph",
                    content:
                        "Linked List Reversed Successfully",
                    style: {

                        title: {

                            fontSize: 22,

                            bold: true,

                        },

                        content: {

                            fontSize: 16,

                            align: "left",

                        }

                    }
                }

            ]

        }
    ]
};

export default dummyDocument;