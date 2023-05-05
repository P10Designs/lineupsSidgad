json = []

CATEGORY = ['SUB 15', 'PLAYER']
CLIENT = document.location.pathname.split('/')[1]

header = Array.from(document.querySelectorAll('.chosen-single span'))?.map((e, i) => `<span style="${i === 1 ? 'font-size: x-large' : ''}">${e.textContent.trim()}</span>`).join('')

document.querySelectorAll(`[id^='fila_ins_']`).forEach((p) => {
  json.push({
    name: p.querySelector(`[id^='datains_']`)?.textContent.trim()?.split(',')[1].trim(),
    surname: p.querySelector(`[id^='datains_']`)?.textContent.trim()?.split(',')[0].trim(),
    img: `https://ns3104249.ip-54-37-85.eu/${CLIENT}/images/fichas/${p.querySelector('.foto_sg_data').attributes['foto'].value}`,
    category: p.querySelector(`[id^='cat_']`)?.textContent.trim()
  })
})

players = json.filter((a) => CATEGORY.includes(a.category));
staff = json.filter((a) => !CATEGORY.includes(a.category));

playersTable = `
  <div style='width: 600px; display:flex; flex-direction:column; align-items: center; justify-content: center; font-weight: 800; font-size: larger;'>${header}</div>
  <table class='sidgad_admin_tabla_bordered'>
    <thead>
      <tr>
        <th colSpan=3>ALINEACIÓN</th>
      </tr>
      <tr>
        <th>
          IMG
        </th>
        <th>
          DORSAL
        </th>
        <th>
          NOMBRE
        </th>
      </tr>
    </thead>
    <tbody>
      ${players.map((u, i) => `
        <tr style='background-color: ${i%2 == 0 ? '#f5f5f5;' : 'white;'}'>
          <td>
            <img src='${u.img}' alt='${u.name}' width='40px' height='auto'>
          </td>
          <td class='px-2'>${u.dorsal || ''}</td>
          <td class='px-2' style='font-size:20px; font-weight:800;'>${u.name} ${u.surname}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`
staffTable =`
  <table class='sidgad_admin_tabla_bordered' id='staffTable' style='margin-top: 20px;'>
    <thead>
      <tr>
        <th colSpan=3>STAFF TÉCNICO</th>
      </tr>
      <tr>
        <th>
          Nombre
        </th>
        <th>
          Apellidos
        </th>
        <th>
          Categoría
        </th>
      </tr>
    </thead>
    <tbody>
      ${staff.map((u, i) => `
        <tr class='${i%2 == 0 ? 'bgWhite' : 'bgGray'}'>
          <td class='px-2'>${u.name}</td>
          <td class='px-2'>${u.surname}
          <td class='px-2'>${u.category}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  <span style='font-size:x-small;text-align: center; width: 600px; display: block;'>Generated with ❤️  by P10MediaGroup</span>
`

win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
win.document.head.innerHTML += `
  <style>
    body {
      font-family: sans-serif;
      -webkit-print-color-adjust:exact !important;
      print-color-adjust:exact !important;
    }

  .sidgad_admin_tabla_bordered {
    width: max-content;
    min-width: 600px;
    background-color: #FFF;
    border-collapse: collapse;
    border: 1px solid #e0e9f0;
    margin-top: 15px;
    margin-bottom: 15px;

  }

  .sidgad_admin_tabla_bordered thead th {
    background-color: #ebf0f2;
    border: 1px solid #c3ced5;
    font-size: 13px;
    text-align: left;
    padding: 2px 0px 2px 5px;
    font-weight: bold;
  }

  .sidgad_admin_tabla_bordered tbody td {
    border-bottom: 1px solid #e0e9f0;
    padding: 0px 0px 0px 5px;
    font-size: 13px;
    border-left: 1px solid #e0e9f0 !important;
  }

  .sidgad_admin_tabla_bordered .bgWhite {
    background-color: white;
  }

  .sidgad_admin_tabla_bordered .bgGray {
    background-color: #f5f5f5;
  }

  .px-2 {
    padding-right: 0.5rem;
  }
</style>`
win.document.body.innerHTML = playersTable + staffTable;
win.print();
win.close();

