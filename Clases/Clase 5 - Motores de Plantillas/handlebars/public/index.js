// Crear plantilla handlebars

const template = Handlebars.compile(`
<h1>Datos Personales</h1>
<ul>
    <li>{{nombre}}</li>
    <li>{{apellido}}</li>
    <li>{{edad}}</li>
    <li>{{email}}</li>
    <li>{{telefono}}</li>
</ul>
`);

// Generar el html, unificando el template y los datos en forma de objeto
const html = template({
  nombre: "Lucia",
  apellido: "Piterilli",
  edad: 26,
  email: "lucia@gmail.com",
  telefono: "4211222324213",
});

document.getElementById("contenedor").innerHTML = html;
