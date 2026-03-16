package com.example.demo;
import jakarta.persistence.*;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String genre;
    @Lob 
    private String generatedCode;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getGeneratedCode() { return generatedCode; }
    public void setGeneratedCode(String generatedCode) { this.generatedCode = generatedCode; }
    private boolean isProTemplate; // To distinguish between free and pro projects

// Add Getter and Setter
public boolean isIsProTemplate() { return isProTemplate; }
public void setIsProTemplate(boolean isProTemplate) { this.isProTemplate = isProTemplate; }
}