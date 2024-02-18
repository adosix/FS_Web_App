package com.example.backend.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "users", schema = "UserManagement")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String status;
    private Integer x;
    private Integer y;

    public UserEntity(String name, String email, String status, Integer x, Integer y) {
        this.name = name;
        this.email = email;
        this.status = status;
        this.x = x;
        this.y = y;
    }

    public UserEntity() {

    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }
}
