package com.example.springboot.model;

import lombok.Data;

@Data
public class PictureWithDescription {

    private final Long id;
    private final String description;
    private final byte[] image;
}
