import { Injectable } from '@angular/core';
import {PictureWithDescription} from '../models/picture-with-description';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {ApiResult} from '../models/apiResult';

@Injectable({
  providedIn: 'root'
})
export class PictureDescriptionService {

  private cloudMersiveUrl: string = "https://api.cloudmersive.com/image/recognize/describe"
  private picturesUrl: string = "http://localhost:8080/api/pictures";

  private httpOptions = {
    headers: new HttpHeaders({
      "Apikey": ""
    })
  };

  private pictures: Subject<PictureWithDescription[]>;

  constructor(private http: HttpClient) { }

  private getData(): void {
    this.http.get<PictureWithDescription[]>(this.picturesUrl).subscribe(
      pictures => {
        this.pictures.next(pictures);
      }
    )
  }

  getPicturesWithDescription(): Observable<PictureWithDescription[]> {
    if (this.pictures === undefined) {
      this.pictures = new BehaviorSubject<PictureWithDescription[]>([]);
      this.getData();
    }
    return this.pictures.asObservable();
  }

  deletePictureWithDescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.picturesUrl}/${id}`).pipe(finalize(() => this.getData()));
  }

  createPictureWithDescription(body: FormData): Observable<any> {
    return this.http.post<any>(this.picturesUrl, body).pipe(finalize(() => this.getData()));
  }

  getDescriptionFromApi(body: FormData): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.cloudMersiveUrl, body, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

}
