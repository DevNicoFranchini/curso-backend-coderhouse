import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.listen(8080, () => console.log("Server on port 8080"));

app.use(cookieParser("clave")); // Indicamos al servidor que utilice cookies.

// Crear una cookie
app.get("/set-cookie1", (req, res) => {
  res.cookie("galleta1", "oreo").send("Cookie1 creada");
});

// Crear una cookie con tiempo de vida
app.get("/set-cookie2", (req, res) => {
  res
    .cookie("galleta2", "pepitos", {
      maxAge: 5000,
    })
    .send("Cookie2 creada");
});

// Leer cookies
app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
});

// Borrar una cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("galleta1").send("Cookie1 eliminada");
});

app.get("/login", (req, res) => {
  res
    .cookie("loginInfo", { name: "Nico", role: "Lector" }, { signed: true })
    .send("Sesión iniciada");
});

app.get("/cookie-signed", (req, res) => {
  res.send(req.signedCookies);
});
