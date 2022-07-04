export default async function loginByCreds(email, password) {
  return await fetch("http://localhost:3001/loginUser", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
}
