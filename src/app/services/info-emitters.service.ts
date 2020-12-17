import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoEmittersService {

  $resolver_Subject = new Subject<string>()
  
  constructor() { }
}
