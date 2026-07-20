async function loadDashboard(){



  const { data } = await client

    .from("casos_sociales")

    .select("*");



  document.getElementById("totalCasos").innerText = data.length;



  document.getElementById("activos").innerText =

    data.filter(c => c.estatus === "Activo").length;



  document.getElementById("proceso").innerText =

    data.filter(c => c.estatus === "En proceso").length;



  document.getElementById("resueltos").innerText =

    data.filter(c => c.estatus === "Resuelto").length;

}
const { data: formatos } = await client
  .from("formatos_documentos")
  .select("*");

document.getElementById("totalFormatos").innerText = formatos.length;


loadDashboard();