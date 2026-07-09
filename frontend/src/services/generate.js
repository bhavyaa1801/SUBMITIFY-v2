const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function parseQuestions(rawQuestions) {

    const response = await fetch(`${BASE_URL}/parse`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rawQuestions,
        }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export async function generateDocument(payload) {

    const response = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}