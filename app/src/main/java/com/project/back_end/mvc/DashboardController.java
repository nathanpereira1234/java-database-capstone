package com.project.back_end.mvc;


import com.yourapp.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private TokenValidationService tokenValidationService;

    // Admin Dashboard
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, String> validationResult = tokenValidationService.validateToken(token, "admin");

        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";  // Thymeleaf template: src/main/resources/templates/admin/adminDashboard.html
        } else {
            return "redirect:/";  // Redirect to login/home page if token is invalid
        }
    }

    // Doctor Dashboard
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, String> validationResult = tokenValidationService.validateToken(token, "doctor");

        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";  // Thymeleaf template: src/main/resources/templates/doctor/doctorDashboard.html
        } else {
            return "redirect:/";  // Redirect to login/home page if token is invalid
        }
    }
}
