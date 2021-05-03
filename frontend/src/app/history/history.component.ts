import { Component, OnInit } from '@angular/core';
import {PictureDescriptionService} from '../services/picture-description.service';
import {PictureWithDescription} from '../models/picture-with-description';
import {LoadingService} from "../services/loading.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  pictures: PictureWithDescription[];
  selectedFile: File = null;
  selectedURL: string | ArrayBuffer;
  loading: boolean

  constructor(private pictureDescriptionService: PictureDescriptionService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.listenToLoading();
    this.getPicturesWithDescription();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
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
    this.pictureDescriptionService.createPictureWithDescription(body).subscribe(() => this.selectedFile = null);
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
    // formData.append("description", "lolXD");
    // this.addPictureWithDescription(formData);
  }
}
