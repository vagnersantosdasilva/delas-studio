import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActiveSectionService } from '../../services/section-service/active-section-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {

  private observer!: IntersectionObserver;

  constructor(private activeSectionService: ActiveSectionService) { }

  scrollToServicos(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('servicos');
    if (element) {
      const offset = 70;
      const pos = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - offset, behavior: 'smooth' });
    }
  }

  whatsappNumber = '5521972332809'; // zap da empresa

  enviarContato(form: any): void {
    if (form.invalid) {
      // Irá mostrar as mensagens de erro nos campos
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    const { nome, email, telefone, mensagem } = form.value;
    const texto = `*Novo contato do site*%0A%0A` +
      `*Nome:* ${encodeURIComponent(nome)}%0A` +
      `*E-mail:* ${encodeURIComponent(email)}%0A` +
      `*Telefone:* ${encodeURIComponent(telefone)}%0A%0A` +
      `*Mensagem:*%0A${encodeURIComponent(mensagem)}`;

    const url = `https://wa.me/${this.whatsappNumber}?text=${texto}`;
    window.open(url, '_blank');

    form.reset(); // limpa o formulário após abrir

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
