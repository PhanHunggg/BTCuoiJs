// 1 tạo nhân viên

employeeList = [];

function validate() {
  var employeeAccount = document.getElementById("tknv").value;
  var employeeName = document.getElementById("name").value;
  var employeeEmail = document.getElementById("email").value;
  var employeePassword = document.getElementById("password").value;
  var employeeDob = document.getElementById("datepicker").value;
  var employeeSalary = document.getElementById("luongCB").value;
  var employeeDuty = document.getElementById("chucvu").value;
  var employeeWorkingHours = document.getElementById("gioLam").value;

  var isValid = true;

  isValid &=
    required(employeeAccount, "tbTKNV") &&
    checkAccount(employeeAccount, "tbTKNV");
  isValid &=
    required(employeeName, "tbTen") &&
    checkEmployeeName(employeeName, "tbTen");
  isValid &=
    required(employeeEmail, "tbEmail") &&
    checkEmployeeEmail(employeeEmail, "tbEmail");
  isValid &=
    required(employeePassword, "tbMatKhau") &&
    checkEmployeePass(employeePassword, "tbMatKhau");
  isValid &=
    required(employeeDob, "tbNgay") && 
    checkEmployeeDob(employeeDob, "tbNgay");
  isValid &=
    required(employeeSalary, "tbLuongCB") &&
    checkSalary(employeeSalary, "tbLuongCB");
  isValid &= checkDuty(employeeDuty, "tbChucVu");
  isValid &=
    required(employeeWorkingHours, "tbGiolam") &&
    checkWorkingHour(employeeWorkingHours, "tbGiolam");

  return isValid;
}

function createEmployee() {
  var isValid = validate();
  if (!isValid) return;

  var employeeAccount = document.getElementById("tknv").value;
  var employeeName = document.getElementById("name").value;
  var employeeEmail = document.getElementById("email").value;
  var employeePassword = document.getElementById("password").value;
  var employeeDob = document.getElementById("datepicker").value;
  var employeeSalary = document.getElementById("luongCB").value;
  var employeeDuty = document.getElementById("chucvu").value;
  var employeeWorkingHours = document.getElementById("gioLam").value;

  //  kiểm tra tài khoản có trùng không
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].employeeAccount === employeeAccount) {
      alert("Tài khoản bị trung lập");
      return;
    }
  }

  // tạo đối tượng nhân viên

  var employee = new Employee(
    employeeAccount,
    employeeName,
    employeeEmail,
    employeePassword,
    employeeDob,
    employeeSalary,
    employeeDuty,
    employeeWorkingHours
  );

  // thêm vào ds nhân viên
  employeeList.push(employee);
  renderEmployee();
  saveData();
  document.getElementById("formBody").reset();
}

// hiển thị danh sách ra màn Hình
function renderEmployee(data) {
  if (!data) data = employeeList;
  var htmlTr = "";
  for (var i = 0; i < data.length; i++) {
    htmlTr += `
        <tr>
          <td>${data[i].employeeAccount}</td>
          <td>${data[i].employeeName}</td>
          <td>${data[i].employeeEmail}</td>
          <td>${data[i].employeeDob}</td>
          <td>${data[i].employeeDuty}</td>
          <td>${data[i].handelSalary()}</td>
          <td>${data[i].kind()}</td>
          <td>
          <button onclick="deleteEmployee( '${
            data[i].employeeAccount
          }' )" class="btn btn-danger">Xóa</button>
          <button data-toggle="modal"
          data-target="#myModal" onclick="getEmployeeDetail( '${
            data[i].employeeAccount
          }' )" class="btn btn-success btnButtonUp">Sửa</button>
          </td>
        </tr>
        `;
  }
  document.getElementById("tableDanhSach").innerHTML = htmlTr;
}

//  Lưu danh sách xuống local storage

function saveData() {
  var employeeListJSON = JSON.stringify(employeeList);
  localStorage.setItem("Employee", employeeListJSON);
}

// Lấy dữ liệu từ local rồi innerHTML

function getData() {
  var JSONData = localStorage.getItem("Employee");
  if (!JSONData) return;
  var employeeListLocal = JSON.parse(JSONData);
  employeeList = mapData(employeeListLocal);
  renderEmployee();
}

// Lấy mảng nhân viên từ local rồi tạo ra mảng nhân viên mới.
// Rồi chuyền vào lại employeeList

function mapData(data) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var oldEmployee = data[i];
    var newEmployee = new Employee(
      oldEmployee.employeeAccount,
      oldEmployee.employeeName,
      oldEmployee.employeeEmail,
      oldEmployee.employeePassword,
      oldEmployee.employeeDob,
      oldEmployee.employeeSalary,
      oldEmployee.employeeDuty,
      oldEmployee.employeeWorkingHours
    );
    result.push(newEmployee);
  }
  return result;
}

// cho hàm getdata chạy từ đầu để hiện các nv cũ

window.onload = function () {
  getData();
};

// xóa employee

function deleteEmployee(account) {
  var index = findByAccount(account);
  if (index === -1) {
    alert("Không có nhân viên này");
    return;
  }
  employeeList.splice(index, 1);
  renderEmployee();
  saveData();
}

function findByAccount(account) {
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].employeeAccount === account) {
      return i;
    }
  }
  return -1;
}

// viết chức năng cập nhật

// bước 1:đưa thông tin nv muốn update lên form
function getEmployeeDetail(account) {
  var index = findByAccount(account);
  if (index === -1) {
    alert("Không có nhân viên này");
    return;
  }
  var employee = employeeList[index];
  document.getElementById("tknv").value = employee.employeeAccount;
  document.getElementById("name").value = employee.employeeName;
  document.getElementById("email").value = employee.employeeEmail;
  document.getElementById("password").value = employee.employeePassword;
  document.getElementById("datepicker").value = employee.employeeDob;
  document.getElementById("luongCB").value = employee.employeeSalary;
  document.getElementById("chucvu").value = employee.employeeDuty;
  document.getElementById("gioLam").value = employee.employeeWorkingHours;
  document.getElementById("tknv").disabled = true;
}

// bước 2 cho người dùng cập nhật thông tin
function updateEmployee() {
  var employeeAccount = document.getElementById("tknv").value;
  var employeeName = document.getElementById("name").value;
  var employeeEmail = document.getElementById("email").value;
  var employeePassword = document.getElementById("password").value;
  var employeeDob = document.getElementById("datepicker").value;
  var employeeSalary = document.getElementById("luongCB").value;
  var employeeDuty = document.getElementById("chucvu").value;
  var employeeWorkingHours = document.getElementById("gioLam").value;

  var index = findByAccount(employeeAccount);
  var employee = employeeList[index];
  employee.employeeName = employeeName;
  employee.employeeEmail = employeeEmail;
  employee.employeePassword = employeePassword;
  employee.employeeDob = employeeDob;
  employee.employeeSalary = employeeSalary;
  employee.employeeDuty = employeeDuty;
  employee.employeeWorkingHours = employeeWorkingHours;
  renderEmployee();
  saveData();
  document.getElementById("tknv").disabled = false;
  document.getElementById("formBody").reset();
}

// viết chức năng sệch

function searchEmployee() {
  var keyword = document.getElementById("loainv").value;
  var result = [];

  for (var i = 0; i < employeeList.length; i++) {
    var currentEmployeeKind = employeeList[i].kind();
    if (currentEmployeeKind.includes(keyword)) {
      result.push(employeeList[i]);
    }
  }
  renderEmployee(result);
}

function resetForm() {
  document.getElementById("formBody").reset();
  document.getElementById("tbTKNV").style.display = "none";
  document.getElementById("tbTen").style.display = "none";
  document.getElementById("tbEmail").style.display = "none";
  document.getElementById("tbMatKhau").style.display = "none";
  document.getElementById("tbNgay").style.display = "none";
  document.getElementById("tbLuongCB").style.display = "none";
  document.getElementById("tbChucVu").style.display = "none";
  document.getElementById("tbGiolam").style.display = "none";
}

// ==================== VALIDATE FUNCTIONS =============================
// kiểm tra xem người dùng nhập chưa

function required(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).style.display = "inline-block";
    document.getElementById(spanId).innerHTML = "* Thông tin này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  document.getElementById(spanId).style.display = "none";
  return true;
}

// checkAccount độ dài ký số

function checkAccount(value, spanId) {
  var patter = /^[0-9]{4,6}$/g;
  if (patter.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    document.getElementById(spanId).style.display = "none";
    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML = "* Vui lòng nhập từ 4-6 ký số";
  return false;
}

// checkEmployeeName check tên không có số không có gạch chân

function checkEmployeeName(value, spanId) {
  var pattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML = "* Chỉ nhập A-z";
  return false;
}

// checkEmployeeEmail check cú phấp mail

function checkEmployeeEmail(value, spanId) {
  var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML = "* Sai cú pháp Email";
  return false;
}

// checkEmployeePass check password phải có ít nhất 1 số 1 ký tự đặc biệt 1 chữ in hoa 1 chứ in thường, đồ dài từ 6-10
function checkEmployeePass(value, spanId) {
  var pattern =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\@\*])(?=.*[a-zA-Z]).{5,10}$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML =
    "* Passwod phải ít nhất có 1 số, 1 a-Z, 1 ký tự đặc biệt, chỉ từ 6-10 ký tự";
  return false;
}

// check lương cơ bản từ 1000000 - 20000000

function checkSalary(value, spanId) {
  if (value >= 1000000 && value <= 20000000) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";

    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML =
    "* Lương CB từ 1.000.000 - 20.000.000";
  return false;
}

//  check xem chọn chức vụ hay chưa

function checkDuty(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).style.display = "inline-block";
    document.getElementById(spanId).innerHTML = "* Vui lòng chọn chức vụ";
    return false;
  }
  document.getElementById(spanId).style.display = "none";
  document.getElementById(spanId).innerHTML = "";

  return true;
}

// check giờ làm tháng từ 80-200

function checkWorkingHour(value, spanId) {
  if (value >= 80 && value <= 200) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";

    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML = "* Thời gian từ 80 - 200 giờ";
  return false;
}

function checkEmployeeDob(value, spanId) {
  var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).style.display = "inline-block";
  document.getElementById(spanId).innerHTML = "* mm/dd/yyyy";
  return false;
}
