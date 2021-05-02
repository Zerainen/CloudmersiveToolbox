package com.example.springboot.converter;

import com.example.springboot.model.PictureWithDescription;
import com.example.springboot.repository.entity.PictureWithDescriptionEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PictureWithDescriptionConverter implements Converter<PictureWithDescriptionEntity, PictureWithDescription> {

    @Override
    public PictureWithDescription convert(PictureWithDescriptionEntity pictureWithDescriptionEntity) {
        return new PictureWithDescription(
                pictureWithDescriptionEntity.getId(),
                pictureWithDescriptionEntity.getDescription(),
                pictureWithDescriptionEntity.getImage()
        );
    }

}
