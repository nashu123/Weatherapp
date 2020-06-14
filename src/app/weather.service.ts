import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  id:any='57a58ff59e7b08711ff30283df083d1a'
  constructor(private http:HttpClient) { }

  showweatherdata(city:string){
    let params = new HttpParams()
    params = params.append('q', city);
params = params.append('appid', this.id);
   return  this.http.get('http://api.openweathermap.org/data/2.5/weather/',{params: params})
  }
}
