package com.genealogy.repository;

import com.genealogy.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    
    /**
     * 根据人员类型查找
     */
    List<Person> findByPersonType(String personType);
    
    /**
     * 根据人员类型和配偶ID查找
     */
    Optional<Person> findByPersonTypeAndSpouseId(String personType, String spouseId);
    
    /**
     * 查找所有配偶
     */
    @Query("SELECT p FROM Person p WHERE p.personType = 'spouse' ORDER BY p.spouseId")
    List<Person> findAllSpouses();
    
    /**
     * 查找丈夫信息
     */
    @Query("SELECT p FROM Person p WHERE p.personType = 'husband'")
    Optional<Person> findHusband();
    
    /**
     * 根据姓名查找
     */
    @Query("SELECT p FROM Person p WHERE p.surname = :surname AND p.firstname = :firstname")
    List<Person> findBySurnameAndFirstname(@Param("surname") String surname, @Param("firstname") String firstname);
    
    /**
     * 删除特定配偶
     */
    void deleteByPersonTypeAndSpouseId(String personType, String spouseId);
} 