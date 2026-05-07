import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveSectionService {
  private activeSectionSource = new BehaviorSubject<string>('home');
  activeSection$ = this.activeSectionSource.asObservable();

  setActiveSection(section: string) {
    this.activeSectionSource.next(section);
  }

}
