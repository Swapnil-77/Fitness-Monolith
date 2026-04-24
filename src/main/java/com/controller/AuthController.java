package com.controller;

import com.dto.LoginRequest;
import com.dto.LoginResponse;
import com.dto.RegisterRequest;
import com.dto.UserResponse;
import com.model.User;
import com.security.JwtUtils;
import com.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.register(registerRequest));
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticate(loginRequest);
            String token = jwtUtils.generateToken(user.getId(), user.getRole().name());
            return ResponseEntity.ok(new LoginResponse(
                    token, userService.mapToResponse(user)
            ));

        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(401).build();
        }
    }
}
