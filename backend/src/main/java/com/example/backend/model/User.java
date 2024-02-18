package com.example.backend.model;

public class User {

    private String name;
    private String email;
    private String status;
    private Integer x;
    private Integer y;

    public User(String name, String email, String status, Integer x, Integer y) {
        this.name = name;
        this.email = email;
        this.status = status;
        this.x = x;
        this.y = x;
    }

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public void setX(Integer x) {
        this.x = x;
    }
    public Integer getX() {
        return x;
    }

    public void setY(Integer y) {
        this.y = y;
    }
    public Integer getY() {
        return y;
    }

}
