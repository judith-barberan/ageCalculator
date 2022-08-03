export async function find() {
  const url = "http://localhost:8080/api/person";
  const headers = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(url, headers)
    .then((response) => response.json())
    .catch(console.error);
    
  return response;
}
