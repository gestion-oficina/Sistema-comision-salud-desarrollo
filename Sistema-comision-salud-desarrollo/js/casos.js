// CARGAR CASOS
async function loadCasos(){
  const { data } = await client
    .from("casos_sociales")
    .select("*")
    .order("id",{ascending:false});

  let html="";

  data.forEach(c=>{
    html += `
      <tr>
        <td>${c.id}</td>
        <td>${c.nombre_ciudadano}</td>
        <td>${c.cedula}</td>
        <td>${c.telefono}</td>
        <td>${c.tipo_solicitud}</td>
        <td>${c.estatus}</td>

        <td>
          <button onclick="verExpediente(${c.id})">
            Ver
          </button>
        </td>

      </tr>
    `;
  });

  document.getElementById("tabla").innerHTML = html;
}
function verExpediente(id){
  window.location.href = `expediente.html?id=${id}`;
}

// EXPEDIENTE
async function verExpediente(id){

  const { data } = await client
    .from("casos_sociales")
    .select("*")
    .eq("id", id)
    .single();

  alert(`
EXPEDIENTE

Nombre: ${data.nombre_ciudadano}
Cédula: ${data.cedula}
Teléfono: ${data.telefono}
Tipo: ${data.tipo_solicitud}
Estatus: ${data.estatus}
  `);
}


// INICIAR
loadCasos();