package com.example.springboot.service;

import com.example.springboot.model.PictureWithDescription;
import com.example.springboot.repository.PictureWithDescriptionRepository;
import com.example.springboot.repository.entity.PictureWithDescriptionEntity;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PictureWithDescriptionService {

    private final PictureWithDescriptionRepository repository;
    private final ConversionService conversionService;

    public PictureWithDescriptionService(PictureWithDescriptionRepository repository, ConversionService conversionService) {
        this.repository = repository;
        this.conversionService = conversionService;
    }

    public List<PictureWithDescription> getPictures() {
        Iterable<PictureWithDescriptionEntity> pictureEntities = repository.findAll();

        return StreamSupport.stream(pictureEntities.spliterator(), false).map(
                pictureWithDescriptionEntity -> conversionService.convert(pictureWithDescriptionEntity, PictureWithDescription.class)).collect(Collectors.toList());
    }

    public PictureWithDescription createPicture(MultipartFile file, String description) throws IOException {
        PictureWithDescriptionEntity entity = new PictureWithDescriptionEntity(
                0L, description, file.getBytes()
        );
        PictureWithDescriptionEntity result = repository.save(entity);
        return conversionService.convert(result, PictureWithDescription.class);
    }

    public void deletePicture(Long id) {
        Optional<PictureWithDescriptionEntity> optional = repository.findById(id);
        optional.ifPresent(repository::delete);
    }
}
