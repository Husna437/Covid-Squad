package com.ibm.covid.rationatyourdoor.data;

public class ConsumerProfile {

	private String consumername;
	private String rationcardnumber;
	private String category;
	private int age;
	private char sex;
	private long mobilenumber;
	private String address;
	private String rationamount;
	private String price;
	private String deliveryStatus;
	public String getConsumername() {
		return consumername;
	}
	public void setConsumername(String consumername) {
		this.consumername = consumername;
	}
	public String getRationcardnumber() {
		return rationcardnumber;
	}
	public void setRationcardnumber(String rationcardnumber) {
		this.rationcardnumber = rationcardnumber;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public char getSex() {
		return sex;
	}
	public void setSex(char sex) {
		this.sex = sex;
	}
	public long getMobilenumber() {
		return mobilenumber;
	}
	public void setMobilenumber(long mobilenumber) {
		this.mobilenumber = mobilenumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRationamount() {
		return rationamount;
	}
	public void setRationamount(String rationamount) {
		this.rationamount = rationamount;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getDeliveryStatus() {
		return deliveryStatus;
	}
	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	@Override
	public String toString() {
		return "ConsumerProfile [consumername=" + consumername + ", rationcardnumber=" + rationcardnumber
				+ ", category=" + category + ", age=" + age + ", sex=" + sex + ", mobilenumber=" + mobilenumber
				+ ", address=" + address + ", rationamount=" + rationamount + ", price=" + price + ", deliveryStatus="
				+ deliveryStatus + "]";
	}
	
}