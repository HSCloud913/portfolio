package kr.co.nebula.portfolio.controller;

import jakarta.validation.Valid;
import kr.co.nebula.portfolio.dto.request.LoginRequest;
import kr.co.nebula.portfolio.dto.response.LoginResponse;
import kr.co.nebula.portfolio.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
