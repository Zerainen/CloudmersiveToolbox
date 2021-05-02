package com.example.springboot.repository.entity;

import lombok.Data;

import javax.persistence.*;

@Entity(name="pictureWithDescription")
@Data
public class PictureWithDescriptionEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String description;
    @Lob
    private byte[] image;

    public PictureWithDescriptionEntity(Long id, String description, byte[] image) {
        this.id = id;
        this.description = description;
        this.image = image;
    }

    public PictureWithDescriptionEntity() {}
}
