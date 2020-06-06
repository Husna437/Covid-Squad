package com.ibm.covid.rationatyourdoor.data;

public class EmployeeProfile {
	
	private String empId;
	private String empName;
	private int empMobileNo;
	private String designation;
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public int getEmpMobileNo() {
		return empMobileNo;
	}
	public void setEmpMobileNo(int empMobileNo) {
		this.empMobileNo = empMobileNo;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
	
	@Override
	public String toString() {
		return "EmployeeProfile [empId=" + empId + ", empName=" + empName + ", empMobileNo=" + empMobileNo
				+ ", designation=" + designation + "]";
	}
	
	

}
