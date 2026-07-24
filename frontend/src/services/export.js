const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function exportPDF(doc) {
  try {
    const response = await fetch(`${BASE_URL}/export/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = window.document.createElement("a");

    a.href = url;
    a.download = "document.pdf";

    window.document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Failed to export PDF.");
  }
}