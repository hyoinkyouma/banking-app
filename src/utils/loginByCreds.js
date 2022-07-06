export default async function loginByCreds(email, password) {
  return await fetch("https://banking-app-avion.herokuapp.com/loginUser", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
}
