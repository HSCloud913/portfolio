package kr.co.nebula.portfolio.service;

import kr.co.nebula.portfolio.config.JwtUtil;
import kr.co.nebula.portfolio.dto.request.LoginRequest;
import kr.co.nebula.portfolio.dto.response.LoginResponse;
import kr.co.nebula.portfolio.entity.Admin;
import kr.co.nebula.portfolio.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.username()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!passwordEncoder.matches(request.password(), admin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return new LoginResponse(jwtUtil.generateToken(admin.getUsername()));
    }
}
