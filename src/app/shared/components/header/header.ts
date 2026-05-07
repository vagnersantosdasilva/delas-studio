import { AfterViewInit, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ActiveSectionService } from '../../../services/section-service/active-section-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  activeSection: string = 'home'; // controla qual link está ativo

  private activeSectionService = inject(ActiveSectionService);

  ngOnInit() {
    // Escuta as mudanças da seção ativa vinda do HomeComponent
    this.activeSectionService.activeSection$.subscribe(section => {
      this.activeSection = section;
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.activeSectionService.setActiveSection(sectionId); // atualiza via serviço

    if (sectionId === 'home') {
      window.scrollTo({ top: 10, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  }

  // Opcional: efeito de encolher a navbar ao rolar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
      navbar?.classList.add('navbar-shrink');
    } else {
      navbar?.classList.remove('navbar-shrink');
    }

    // Força home se estiver no topo
    if (window.scrollY < 100) {
      this.activeSectionService.setActiveSection('home');
    }
  }
}
