import "./style.css";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


const api_url = "https://retoolapi.dev/GQy3rE/data"

document.addEventListener("DOMContentLoaded", () => {
  const workerForm = document.getElementById("workerForm");
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", resetForm)
  workerForm.addEventListener("submit", handleworker)
  listWorkers();
});


// WorkersTable
function listWorkers() {
  const workerTable = document.getElementById("workerTable");
  fetch(api_url).then(httpResponse => httpResponse.json()).then(responseBody => {
  
  workerTable.innerHTML="";
  responseBody.forEach(worker => {
      //Adatok
      const tableRow=document.createElement("tr");
      const idTableData= document.createElement("td");
      const JobTableData= document.createElement("td");
      const NameTableData= document.createElement("td");
      const CreditTableData= document.createElement("td");
      const CompanyNameTableData= document.createElement("td");
      
      //Műveletek rész
      const actionsTableData= document.createElement("td");
      
      //Adat módosítása gomb
      const updateButton = document.createElement("button");
      updateButton.textContent = "Módosít";
      updateButton.className = "btn btn-warning";
      updateButton.addEventListener("click", () => updateForm(worker.id));
      actionsTableData.appendChild(updateButton);
      
      //Adat törlése gomb
      const deleteButton = document.createElement("button");
      deleteButton.textContent="Törlés";
      deleteButton.className = "btn btn-danger";
      deleteButton.addEventListener("click", () => deleteWorker(worker.id));
      actionsTableData.appendChild(deleteButton);
      
      //Táblázat
      idTableData.textContent=worker.id;
      JobTableData.textContent=worker.Job;
      NameTableData.textContent=worker.Name;
      CreditTableData.textContent=worker.Credit;
      CompanyNameTableData.textContent=worker.CompanyName;
      tableRow.appendChild(idTableData);
      tableRow.appendChild(JobTableData);
      tableRow.appendChild(NameTableData);
      tableRow.appendChild(CreditTableData);
      tableRow.appendChild(CompanyNameTableData);
      tableRow.appendChild(actionsTableData);
      workerTable.appendChild(tableRow);
    });
  });
}   

//WorkerForm
function handleworker(event) {
  event.preventDefault();
  const id = document.getElementById("id").value;
  const name = document.getElementById('Name').value;
  const job = document.getElementById('Job').value;
  const credit = document.getElementById('Credit').value;
  const companyname = document.getElementById('CompanyName').value;
  const worker = {
    name: name,
    job: job,
    credit: credit,
    companynname: companyname
  };
  if (id ==""){
  addWorker(worker);
  } else {
    updateWorker(id, worker);
  }
}

async function updateWorker(id, worker){
  const response = await fetch (`${api_url}/${id}`, {
    method: " PATCH",
    body: JSON.stringify(worker),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(response.ok){
    resetForm();
    listWorkers();
  }
}

async function addWorker(worker){
  const response = await fetch(api_url, {
    method: "POST", 
    body: JSON.stringify(worker), 
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(response.ok) {
    listWorkers();
    resetForm();
  };
}

function resetForm() {
  document.getElementById('Name').value = "";
  document.getElementById('Job').value = "";
  document.getElementById('Credit').value = "";
  document.getElementById('CompanyName').value = "";
  document.getElementById("submitButton").classList.remove('d-none');
  document.getElementById("updateButton").classList.add('d-none');
}

//Actions
async function deleteWorker(id) {
  const response = await fetch(`${api_url}/${id}`, {method: "DELETE"}); 
  if (response.ok){
    listWorkers();
  }
}

async function updateForm(id) {
  const response = await fetch(`${api_url}/${id}`); 
  if (!response.ok){
    alert("Hiba a bekért adatok betöltése során.")
    return;
  }
  const worker = await response.json();
  document.getElementById("id").value = worker.id;
  document.getElementById("Name").value = worker.Name;
  document.getElementById("Job").value = worker.Job;
  document.getElementById("Credit").value = worker.Credit;
  document.getElementById("CompanyName").value = worker.CompanyName;
  document.getElementById("submitButton").classList.add('d-none');
  document.getElementById("updateButton").classList.remove('d-none');
}

