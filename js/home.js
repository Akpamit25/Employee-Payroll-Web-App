let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList") ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = () => {
  const headerHtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml = `${headerHtml}`;
  let empPayrollList = createEmployeePayrollJSON();
  // if (empPayrollList.length == 0) return;
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
          <td>${empPayrollData._startDate}</td>
          <td>
          <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete" 
              src="../assets/icons/delete-black-18dp.svg">
      <img name="${empPayrollData._id}" alt="edit" onclick="update(this)"
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

const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: 'Stark',
      _gender: 'male',
      _department: [
        'Finance',
        'Engineer'
      ],
      _salary: '499999',
      _startDate: '14 June 2019',
      _note: 'Hi ',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -3.png'
    },
    {
      _name: 'Akhil',
      _gender: 'male',
      _department: ['Others'],
      _salary: '292499',
      _startDate: '15 Aug 2020',
      _note: 'Hello',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -2.png'
    }
  ];
  return empPayrollListLocal;
}

/* */