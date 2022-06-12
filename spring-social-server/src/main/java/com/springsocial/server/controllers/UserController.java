package com.springsocial.server.controllers;

import com.springsocial.server.dto.UserDTO;
import com.springsocial.server.security.UserDetail.CurrentUser;
import com.springsocial.server.security.UserDetail.UserDetailImpl;
import com.springsocial.server.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @GetMapping("/currentUser")
    @PreAuthorize("hasRole('USER')")
    public UserDTO getCurrentUser(@CurrentUser UserDetailImpl currentUser) {
        UserDTO userDTO = new UserDTO(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userDTO;
    }
}
