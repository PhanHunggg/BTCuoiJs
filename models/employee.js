function Employee(
  account,
  name,
  email,
  password,
  dob,
  salary,
  duty,
  workingHours
) {
  this.employeeAccount = account;
  this.employeeName = name;
  this.employeeEmail = email;
  this.employeePassword = password;
  this.employeeDob = dob;
  this.employeeSalary = salary;
  this.employeeDuty = duty;
  this.employeeWorkingHours = workingHours;
  this.handelSalary = function () {
    var dutyEmploy = this.employeeDuty;
    if (dutyEmploy === "Sếp") {
      return salary * 3;
    }
    if (dutyEmploy === "Trưởng phòng") {
      return salary * 2;
    }
    if (dutyEmploy === "Nhân viên") {
      return salary;
    }
  };
  this.kind = function () {
    var time = this.employeeWorkingHours;
    if (time >= 192) {
      return "Nhân viên xuất sắc";
    }
    if (time >= 176){
        return "Nhân viên giỏi"
    }
    if (time >= 160 ){
        return "Nhân viên khá"
    }
    if (time < 160){
        return "Nhân viên trung Bình"
    }
  };
}