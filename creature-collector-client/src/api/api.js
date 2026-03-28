export async function apiRequest(path, options = {}) {
const response = await fetch(`http://localhost:5000${path}`, {
credentials: 'include', 
headers: { 'Content-Type': 'application/json' },
...options
});
return response.json();
}