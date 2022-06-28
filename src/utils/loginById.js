export default async function (id) {
  return await fetch("http://localhost:3001/exchangeRate", {
    method: "POST",
    body: { id: id },
  });
}
