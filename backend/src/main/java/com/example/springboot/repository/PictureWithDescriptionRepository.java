package com.example.springboot.repository;

import com.example.springboot.repository.entity.PictureWithDescriptionEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureWithDescriptionRepository extends CrudRepository<PictureWithDescriptionEntity, Long> {
}
