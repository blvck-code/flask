import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IExperience} from "../models/experience";
import {ExperienceService} from "../services/experience/experience.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperienceResolverService implements Resolve<IExperience[]>{

  constructor(private expeService: ExperienceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExperience[]> | Promise<IExperience[]> | IExperience[] {
    return this.expeService.getExperience()
  }

}
