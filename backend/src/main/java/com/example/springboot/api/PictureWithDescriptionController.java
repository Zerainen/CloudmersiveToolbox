package com.example.springboot.api;

import com.example.springboot.model.PictureWithDescription;
import com.example.springboot.service.PictureWithDescriptionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping(path="api/pictures")
public class PictureWithDescriptionController {

    private final PictureWithDescriptionService pictureWithDescriptionService;

    public PictureWithDescriptionController(PictureWithDescriptionService pictureWithDescriptionService) { this.pictureWithDescriptionService = pictureWithDescriptionService; }

    @GetMapping(path = "")
    public List<PictureWithDescription> getPictures() {
        System.out.println("GET PICTURES GOT CALLED");
        return pictureWithDescriptionService.getPictures();
    }

    @PostMapping(path = "")
    public PictureWithDescription createPicture(@RequestParam("imageFile") MultipartFile file, @RequestParam("description") String description) throws IOException {
        System.out.println("CREATE PICTURES GOT CALLED");
        return this.pictureWithDescriptionService.createPicture(file, description);
    }

    @DeleteMapping(path = "/{id}")
    public void deletePicture(@PathVariable Long id) {
        System.out.println("DELETE PICTURES GOT CALLED");
        pictureWithDescriptionService.deletePicture(id);
    }
}
