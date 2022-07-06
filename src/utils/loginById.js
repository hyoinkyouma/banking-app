export default async function loginById(id, cb) {
  return await fetch("https://banking-app-avion.herokuapp.com/loginUserById", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
  })
    .then((data) => data.json())
    .then((dataJSON) => cb(dataJSON));
}
