package com.example.demo;

public class GameRequest {
    private String name;
    private String idea;
    private String generatedCode; // Intha field thaan missing!

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIdea() { return idea; }
    public void setIdea(String idea) { this.idea = idea; }

    public String getGeneratedCode() { return generatedCode; }
    public void setGeneratedCode(String generatedCode) { this.generatedCode = generatedCode; }
}