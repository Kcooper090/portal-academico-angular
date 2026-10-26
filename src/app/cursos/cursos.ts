import { Component, signal } from '@angular/core';

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  detalhes: string;
  imagem: string;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos {
  cursos: Curso[] = [
    {
      id: 1,
      titulo: 'Informática Básica',
      descricao:
        'Aprenda os fundamentos da informática e desenvolva habilidades para utilizar computadores e ferramentas digitais no dia a dia.',
      detalhes: 'Nível:Iniciante',
      imagem: 'https://i.pinimg.com/1200x/6e/b9/c0/6eb9c013f87b80c0de8e124e6704ba07.jpg',
    },
    {
      id: 2,
      titulo: 'Programação',
      descricao:
        'Desenvolva o raciocínio lógico e aprenda a criar programas por meio de linguaguens de programação e resolução de problemas.',
      detalhes: 'Texto completo do Curso 2.',
      imagem: 'https://i.pinimg.com/736x/63/2b/80/632b80cca4fbc8ba249392ee473236ea.jpg',
    },
    {
      id: 3,
      titulo: 'Inglês',
      descricao:
        'Aprenda a se comunicar em inglês, ampliando seu vocabulário e desenvolvendo habilidades de leitura, escrita, compreensão e conversação.',
      detalhes: 'Texto completo do Curso 3.',
      imagem: 'https://i.pinimg.com/736x/4b/7c/3d/4b7c3deddda4283e693a56bbf800e703.jpg',
    },
    {
      id: 4,
      titulo: 'Educação Financeira',
      descricao:
        'Aprenda a addministrar seu dinheiro, organizar seu orçamento e tomar decisões financeiras mais conscientes para alcançar seus objetivos.',
      detalhes: 'Texto completo do Curso 3.',
      imagem: 'https://i.pinimg.com/736x/17/b5/9a/17b59aa64acf70388cb22afee67418e1.jpg',
    },
  ];

  selecionado = signal<Curso | null>(null);

  verDetalhes(curso: Curso): void {
    this.selecionado.set(curso);
  }

  fechar(): void {
    this.selecionado.set(null);
  }
}