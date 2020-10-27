export class UserRecord {
    constructor({
        employeeId,
        firstName,
        lastName
    }) {
      this.setEmployeeId(employeeId);
      this.setFirstName(firstName);
      this.setLastName(lastName);
    }
  
    getEmployeeId() {
      return this.employeeId;
    }
  
    setEmployeeId(employeeId) {
      this.employeeId = employeeId;
    }
  
    getFirstName() {
      return this.firstName;
    }
  
    setFirstName(firstName) {
      this.firstName = firstName;
    }
  
    getLastName() {
      return this.lastName;
    }
  
    setLastName(lastName) {
      this.lastName = lastName;
    }
  
    toObject() {
      return {
        employeeId: this.getEmployeeId(),
        firstName: this.getFirstName(),
        lastName: this.getLastName()
      };
    }
  }