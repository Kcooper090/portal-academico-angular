import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface LinkNav {
  rotulo: string;
  rota: string;
  exato?: boolean;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menuAberto = signal(false);

  links: LinkNav[] = [
    { rotulo: 'Início', rota: '/dashboard', exato: true },
    { rotulo: 'Notas', rota: '/notas' },
    { rotulo: 'Cursos', rota: '/cursos' },
    { rotulo: 'Alunos', rota: '/alunos' },
  ];

  alternarMenu() {
    this.menuAberto.update((aberto) => !aberto);
  }

  fecharMenu() {
    this.menuAberto.set(false);
  }


}