package com.genealogy.controller;

import com.genealogy.entity.Person;
import com.genealogy.service.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "*") // 允许跨域请求
public class PersonController {
    
    private static final Logger logger = LoggerFactory.getLogger(PersonController.class);
    
    @Autowired
    private PersonService personService;
    
    /**
     * 保存人员信息（丈夫和所有配偶）
     */
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> savePersons(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("接收到保存人员信息请求");
            
            // 获取丈夫信息
            Map<String, Object> husbandData = (Map<String, Object>) requestData.get("husband");
            if (husbandData != null) {
                husbandData.put("personType", "husband");
                husbandData.put("spouseId", null);
                Person savedHusband = personService.saveOrUpdatePerson(husbandData);
                logger.info("保存丈夫信息成功, ID: {}", savedHusband.getId());
            }
            
            // 获取配偶信息列表
            List<Map<String, Object>> spousesData = (List<Map<String, Object>>) requestData.get("spouses");
            if (spousesData != null && !spousesData.isEmpty()) {
                for (Map<String, Object> spouseData : spousesData) {
                    spouseData.put("personType", "spouse");
                    Person savedSpouse = personService.saveOrUpdatePerson(spouseData);
                    logger.info("保存配偶信息成功, ID: {}, 配偶ID: {}", 
                              savedSpouse.getId(), savedSpouse.getSpouseId());
                }
            }
            
            response.put("success", true);
            response.put("message", "信息保存成功");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("保存人员信息时发生错误: ", e);
            response.put("success", false);
            response.put("message", "保存失败: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 获取所有人员信息
     */
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllPersons() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 获取丈夫信息
            Person husband = personService.getHusband().orElse(null);
            
            // 获取所有配偶信息
            List<Person> spouses = personService.getAllSpouses();
            
            response.put("success", true);
            response.put("husband", husband);
            response.put("spouses", spouses);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("获取人员信息时发生错误: ", e);
            response.put("success", false);
            response.put("message", "获取失败: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 获取丈夫信息
     */
    @GetMapping("/husband")
    public ResponseEntity<Map<String, Object>> getHusband() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Person husband = personService.getHusband().orElse(null);
            
            response.put("success", true);
            response.put("data", husband);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("获取丈夫信息时发生错误: ", e);
            response.put("success", false);
            response.put("message", "获取失败: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 获取所有配偶信息
     */
    @GetMapping("/spouses")
    public ResponseEntity<Map<String, Object>> getAllSpouses() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Person> spouses = personService.getAllSpouses();
            
            response.put("success", true);
            response.put("data", spouses);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("获取配偶信息时发生错误: ", e);
            response.put("success", false);
            response.put("message", "获取失败: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 根据配偶ID获取配偶信息
     */
    @GetMapping("/spouse/{spouseId}")
    public ResponseEntity<Map<String, Object>> getSpouseById(@PathVariable String spouseId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Person spouse = personService.getSpouseById(spouseId).orElse(null);
            
            response.put("success", true);
            response.put("data", spouse);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("获取配偶信息时发生错误: ", e);
            response.put("success", false);
            response.put("message", "获取失败: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 删除配偶
     */
    @DeleteMapping("/spouse/{spouseId}")
    public ResponseEntity<Map<String, Object>> deleteSpouse(@PathVariable String spouseId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            personService.deleteSpouse(spouseId);
            
            response.put("success", true);
            response.put("message", "配偶删除成功");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("删除配偶时发生错误: ", e);
            response.put("success", false);
            response.put("message", "删除失败: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 健康检查接口
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "族谱管理系统");
        
        return ResponseEntity.ok(response);
    }
} 