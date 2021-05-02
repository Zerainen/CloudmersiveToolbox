import { Component, OnInit } from '@angular/core';
import {PictureDescriptionService} from '../services/picture-description.service';
import {PictureWithDescription} from '../models/picture-with-description';
import {Form} from "@angular/forms";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  pictures: PictureWithDescription[];
  selectedFile: File = null;
  selectedURL: string | ArrayBuffer;

  constructor(private pictureDescriptionService: PictureDescriptionService) { }

  ngOnInit(): void {
    this.getPicturesWithDescription();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event) => {
      this.selectedURL = event.target.result;
    }
  }

  getPicturesWithDescription(): void {
    this.pictureDescriptionService.getPicturesWithDescription()
      .subscribe(pictures => this.pictures = pictures)
  }

  addPictureWithDescription(body: FormData): void {
    this.pictureDescriptionService.createPictureWithDescription(body).subscribe();
  }

  deletePictureWithDescription(picture: PictureWithDescription): void {
    this.pictureDescriptionService.deletePictureWithDescription(picture.id).subscribe();
  }

  getDescriptionFromApi(): void {
    const formData = new FormData();
    formData.append("imageFile", this.selectedFile, this.selectedFile.name);
    this.pictureDescriptionService.getDescriptionFromApi(formData).subscribe(
      res => {
        formData.append("description", res.BestOutcome.Description);
        this.addPictureWithDescription(formData);
      }
    );
  }
}
