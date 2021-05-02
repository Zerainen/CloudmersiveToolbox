import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PictureWithDescription} from "../models/picture-with-description";

@Component({
  selector: 'app-picture-description-card',
  templateUrl: './picture-description-card.component.html',
  styleUrls: ['./picture-description-card.component.scss']
})
export class PictureDescriptionCardComponent implements OnInit {

  @Input() pictureWithDescription: PictureWithDescription
  @Output() emitPictureToDelete = new EventEmitter<PictureWithDescription>();
  constructor() { }

  ngOnInit(): void {
  }

  deletePicture(picture: PictureWithDescription) {
    this.emitPictureToDelete.emit(picture);
  }

  formatImage(img: any): any {
    return 'data:image/jpeg;base64,' + img;
  }
}

