package com.springsocial.server.services;

import com.springsocial.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public <T> Optional<T> findByUsername(String username) {
        return (Optional<T>) userRepository.findByUsername(username);
    }
}
