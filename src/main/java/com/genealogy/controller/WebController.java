package com.genealogy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    
    /**
     * 主页面
     */
    @GetMapping("/")
    public String index() {
        return "redirect:/genealogy_manager.html";
    }
    
    /**
     * 族谱管理页面
     */
    @GetMapping("/genealogy")
    public String genealogy() {
        return "redirect:/genealogy_manager.html";
    }
} 