package com.genealogy.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "persons")
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "person_type", nullable = false)
    private String personType; // "husband" 或 "spouse"
    
    @Column(name = "spouse_id")
    private String spouseId; // 用于区分不同的配偶 (spouse, spouse2, spouse3 等)
    
    @Column(name = "surname", length = 50)
    private String surname; // 姓
    
    @Column(name = "firstname", length = 100)
    private String firstname; // 名
    
    @Column(name = "mother", length = 100)
    private String mother; // 母亲
    
    @Column(name = "ranking", length = 100)
    private String ranking; // 排行
    
    @Column(name = "marriage_type", length = 50)
    private String marriageType; // 婚配类型 (仅配偶)
    
    @Column(name = "living_status")
    private Boolean livingStatus; // 是否在世
    
    @Column(name = "age")
    private Integer age; // 享年
    
    @Column(name = "birthday", length = 200)
    private String birthday; // 生日
    
    @Column(name = "deathday", length = 200)
    private String deathday; // 歿于
    
    @Column(name = "burial_place", length = 500)
    private String burialPlace; // 安厝地
    
    @Column(name = "school", length = 200)
    private String school; // 学校
    
    @Column(name = "education", length = 200)
    private String education; // 学历
    
    @Column(name = "company", length = 200)
    private String company; // 单位
    
    @Column(name = "position", length = 200)
    private String position; // 职务
    
    @Column(name = "origin_place", length = 200)
    private String originPlace; // 祖籍地
    
    @Column(name = "current_address", length = 200)
    private String currentAddress; // 现居地
    
    @Column(name = "phone", length = 200)
    private String phone; // 电话
    
    @Column(name = "wechat", length = 200)
    private String wechat; // 微信
    
    @Column(name = "introduction", length = 600)
    private String introduction; // 简介
    
    @Column(name = "photo_path", length = 500)
    private String photoPath; // 头像路径
    
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;
    
    // 构造函数
    public Person() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPersonType() {
        return personType;
    }
    
    public void setPersonType(String personType) {
        this.personType = personType;
    }
    
    public String getSpouseId() {
        return spouseId;
    }
    
    public void setSpouseId(String spouseId) {
        this.spouseId = spouseId;
    }
    
    public String getSurname() {
        return surname;
    }
    
    public void setSurname(String surname) {
        this.surname = surname;
    }
    
    public String getFirstname() {
        return firstname;
    }
    
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    
    public String getMother() {
        return mother;
    }
    
    public void setMother(String mother) {
        this.mother = mother;
    }
    
    public String getRanking() {
        return ranking;
    }
    
    public void setRanking(String ranking) {
        this.ranking = ranking;
    }
    
    public String getMarriageType() {
        return marriageType;
    }
    
    public void setMarriageType(String marriageType) {
        this.marriageType = marriageType;
    }
    
    public Boolean getLivingStatus() {
        return livingStatus;
    }
    
    public void setLivingStatus(Boolean livingStatus) {
        this.livingStatus = livingStatus;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public String getBirthday() {
        return birthday;
    }
    
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    
    public String getDeathday() {
        return deathday;
    }
    
    public void setDeathday(String deathday) {
        this.deathday = deathday;
    }
    
    public String getBurialPlace() {
        return burialPlace;
    }
    
    public void setBurialPlace(String burialPlace) {
        this.burialPlace = burialPlace;
    }
    
    public String getSchool() {
        return school;
    }
    
    public void setSchool(String school) {
        this.school = school;
    }
    
    public String getEducation() {
        return education;
    }
    
    public void setEducation(String education) {
        this.education = education;
    }
    
    public String getCompany() {
        return company;
    }
    
    public void setCompany(String company) {
        this.company = company;
    }
    
    public String getPosition() {
        return position;
    }
    
    public void setPosition(String position) {
        this.position = position;
    }
    
    public String getOriginPlace() {
        return originPlace;
    }
    
    public void setOriginPlace(String originPlace) {
        this.originPlace = originPlace;
    }
    
    public String getCurrentAddress() {
        return currentAddress;
    }
    
    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getWechat() {
        return wechat;
    }
    
    public void setWechat(String wechat) {
        this.wechat = wechat;
    }
    
    public String getIntroduction() {
        return introduction;
    }
    
    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
    
    public String getPhotoPath() {
        return photoPath;
    }
    
    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
    
    public LocalDateTime getCreatedTime() {
        return createdTime;
    }
    
    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
    
    public LocalDateTime getUpdatedTime() {
        return updatedTime;
    }
    
    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedTime = LocalDateTime.now();
    }
} 