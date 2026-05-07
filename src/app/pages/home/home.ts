import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveSectionService } from '../../services/section-service/active-section-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {

  private observer!: IntersectionObserver;

  constructor(private activeSectionService: ActiveSectionService) {}

  scrollToServicos(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('servicos');
    if (element) {
      const offset = 70;
      const pos = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - offset, behavior: 'smooth' });
    }
  }

  enviarContato(form: NgForm): void {
    if (form.valid) {
      console.log('Formulário enviado', form.value);
      // Aqui você pode chamar um serviço HTTP para enviar o e-mail
      alert('Mensagem enviada com sucesso!');
      form.reset();
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

  ngAfterViewInit() {
    this.setupScrollSpy();
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]'); // observa o header e todas as sections com id
    const options = {
      threshold: 0.3, // quando 30% da seção estiver visível
      rootMargin: '-70px 0px 0px 0px' // desconta a altura da navbar fixa
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.activeSectionService.setActiveSection(id);
          }
        }
      });
    }, options);

    sections.forEach(section => this.observer.observe(section));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

}
