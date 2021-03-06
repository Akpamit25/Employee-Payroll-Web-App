let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  }
  else getEmployeePayrollDataFromServer();

});

const getEmployeePayrollDataFromStorage = () => {
  empPayrollList = localStorage.getItem("empList") ?
    JSON.parse(localStorage.getItem('empList')) : [];
  processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true) // then is used for executing the promise
    .then(responseText => {
      empPayrollList = JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch(error => {
      console.log("Get Error Status : " + JSON.stringify(error));
      empPayrollList = [];
      processEmployeePayrollDataResponse();
    });
}
const createInnerHtml = () => {
  if (empPayrollList.length == 0) return;
  const headerHtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    innerHtml = `${innerHtml}
      <tr>
          <td>
          <img class="profile" alt="" src="${empPayrollData._profilePic}">
          </td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}</td>
          <td>${empPayrollData._salary}</td>
          <td>${stringifyDate(empPayrollData._startDate)}</td>
          <td>
          <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" 
              src="../assets/icons/delete-black-18dp.svg">
      <img id="${empPayrollData.id}" alt="edit" onclick="update(this)"
              src="../assets/icons/create-black-18dp.svg">
          </td>
      </tr>
      `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
  }
  return deptHtml;
}

const remove = (node) => {
  let empData = empPayrollList.find(empData => empData.id == node.id);
  if (!empData) return;
  const index = empPayrollList
    .map(empData => empData.id)
    .indexOf(empData.id);
  empPayrollList.splice(index, 1);
  if (site_properties.use_local_storage.match("true")) {
    localStorage.setItem("empList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
  }
  else {
    const deleteURL = site_properties.server_url + empData.id.toString();
    makeServiceCall("DELETE", deleteURL, false) // then is used for executing the promise
      .then(responseText => {
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHtml();
      }).catch(error => {
        console.log("Delete Error Status : " + JSON.stringify(error));
      });

  }
}

const update = (node) => {
  let empData = empPayrollList.find(empData => empData.id == node.id);
  if (!empData) return;
  localStorage.setItem('editEmp', JSON.stringify(empData));
  window.location.replace(site_properties.add_employee_page);
}