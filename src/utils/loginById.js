export default async function loginById(id, cb) {
  return await fetch("http://localhost:3001/loginUserById", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-type": "application/json" },
  })
    .then((data) => data.json())
    .then((dataJSON) => cb(dataJSON));
}
