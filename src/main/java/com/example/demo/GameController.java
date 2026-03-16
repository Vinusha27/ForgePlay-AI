package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameRepository repository;

    @PostMapping("/create")
    public Game saveGame(@RequestBody Game game) {
        if (game == null) {
            throw new IllegalArgumentException("Game data cannot be null");
        }
        // repository.save() direct-ah result-ah return pannum, null-ah irukkaadhu.
        return repository.save(game);
    }
    @GetMapping("/all")
    public List<Game> getAllGames() {
        return repository.findAll();
    }

    // ✅ FIXED: Only ONE delete method with Null Safety
    @DeleteMapping("/delete/{id}")
    public String deleteGame(@PathVariable("id") Long id) {
        if (id == null) {
            return "Error: ID cannot be null.";
        }
        
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Project " + id + " has been wiped from memory! 🗑️";
        } else {
            return "Error: Project with ID " + id + " not found.";
        }
    }
}