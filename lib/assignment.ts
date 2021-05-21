export async function getAssignment() {
  const response = await fetch(
    "https://nostalgic-ramanujan-96cef2.netlify.app/.netlify/functions/autograde"
  );
  return response.json();
}

