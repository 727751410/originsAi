package com.genealogy.service;

import com.genealogy.entity.Person;
import com.genealogy.repository.PersonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class PersonService {
    
    private static final Logger logger = LoggerFactory.getLogger(PersonService.class);
    
    @Autowired
    private PersonRepository personRepository;
    
    /**
     * 保存或更新人员信息
     */
    public Person saveOrUpdatePerson(Map<String, Object> personData) {
        try {
            String personType = (String) personData.get("personType");
            String spouseId = (String) personData.get("spouseId");
            
            // 查找现有记录
            Person person;
            if ("husband".equals(personType)) {
                Optional<Person> existingHusband = personRepository.findHusband();
                person = existingHusband.orElse(new Person());
            } else {
                Optional<Person> existingSpouse = personRepository.findByPersonTypeAndSpouseId(personType, spouseId);
                person = existingSpouse.orElse(new Person());
            }
            
            // 设置基本信息
            person.setPersonType(personType);
            person.setSpouseId(spouseId);
            
            // 设置个人信息
            setPersonFields(person, personData);
            
            // 保存到数据库
            Person savedPerson = personRepository.save(person);
            logger.info("成功保存人员信息: {}, ID: {}", personType, savedPerson.getId());
            
            return savedPerson;
            
        } catch (Exception e) {
            logger.error("保存人员信息时发生错误: ", e);
            throw new RuntimeException("保存人员信息失败: " + e.getMessage());
        }
    }
    
    /**
     * 设置人员字段信息
     */
    private void setPersonFields(Person person, Map<String, Object> data) {
        // 基本信息
        person.setSurname(getStringValue(data, "surname"));
        person.setFirstname(getStringValue(data, "firstname"));
        person.setMother(getStringValue(data, "mother"));
        person.setRanking(getStringValue(data, "ranking"));
        
        // 配偶特有字段
        if ("spouse".equals(person.getPersonType())) {
            person.setMarriageType(getStringValue(data, "marriageType"));
        }
        
        // 生活状态
        person.setLivingStatus(getBooleanValue(data, "livingStatus"));
        person.setAge(getIntegerValue(data, "age"));
        person.setBirthday(getStringValue(data, "birthday"));
        person.setDeathday(getStringValue(data, "deathday"));
        person.setBurialPlace(getStringValue(data, "burialPlace"));
        
        // 教育和工作
        person.setSchool(getStringValue(data, "school"));
        person.setEducation(getStringValue(data, "education"));
        person.setCompany(getStringValue(data, "company"));
        person.setPosition(getStringValue(data, "position"));
        
        // 联系信息
        person.setOriginPlace(getStringValue(data, "originPlace"));
        person.setCurrentAddress(getStringValue(data, "currentAddress"));
        person.setPhone(getStringValue(data, "phone"));
        person.setWechat(getStringValue(data, "wechat"));
        
        // 其他信息
        person.setIntroduction(getStringValue(data, "introduction"));
        person.setPhotoPath(getStringValue(data, "photoPath"));
        
        // 更新时间
        person.setUpdatedTime(LocalDateTime.now());
    }
    
    /**
     * 获取字符串值，处理null和空字符串
     */
    private String getStringValue(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null || "".equals(value.toString().trim())) {
            return null;
        }
        return value.toString().trim();
    }
    
    /**
     * 获取布尔值
     */
    private Boolean getBooleanValue(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null) {
            return null;
        }
        if (value instanceof Boolean) {
            return (Boolean) value;
        }
        return Boolean.parseBoolean(value.toString());
    }
    
    /**
     * 获取整数值
     */
    private Integer getIntegerValue(Map<String, Object> data, String key) {
        Object value = data.get(key);
        if (value == null || "".equals(value.toString().trim())) {
            return null;
        }
        try {
            return Integer.parseInt(value.toString().trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    /**
     * 获取丈夫信息
     */
    public Optional<Person> getHusband() {
        return personRepository.findHusband();
    }
    
    /**
     * 获取所有配偶信息
     */
    public List<Person> getAllSpouses() {
        return personRepository.findAllSpouses();
    }
    
    /**
     * 根据配偶ID获取配偶信息
     */
    public Optional<Person> getSpouseById(String spouseId) {
        return personRepository.findByPersonTypeAndSpouseId("spouse", spouseId);
    }
    
    /**
     * 删除配偶
     */
    public void deleteSpouse(String spouseId) {
        try {
            personRepository.deleteByPersonTypeAndSpouseId("spouse", spouseId);
            logger.info("成功删除配偶: {}", spouseId);
        } catch (Exception e) {
            logger.error("删除配偶时发生错误: ", e);
            throw new RuntimeException("删除配偶失败: " + e.getMessage());
        }
    }
    
    /**
     * 获取所有人员信息
     */
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }
} 