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
      detalhes: 'Curso introdutório voltado a quem deseja ter autonomia no uso do computador e da internet. Você aprenderá a operar o sistema operacional, organizar arquivos e pastas, usar editores de texto e planilhas, navegar com segurança e utilizar e-mail e serviços em nuvem. Ao final, estará apto a realizar tarefas digitais do dia a dia e a se preparar para o mercado de trabalho. Nível: iniciante, sem necessidade de conhecimento prévio.',

      imagem: 'https://i.pinimg.com/1200x/6e/b9/c0/6eb9c013f87b80c0de8e124e6704ba07.jpg',
    },
    {
      id: 2,
      titulo: 'Programação',
      descricao:
        'Desenvolva o raciocínio lógico e aprenda a criar programas por meio de linguaguens de programação e resolução de problemas.',
      detalhes: 'Curso que desenvolve o raciocínio lógico e as bases da programação. Você aprenderá lógica, algoritmos, variáveis, estruturas condicionais e de repetição, funções e boas práticas de código, aplicando tudo em exercícios e pequenos projetos. Ao final, será capaz de analisar problemas, propor soluções e criar programas simples, com uma base sólida para avançar em desenvolvimento web ou de sistemas. Nível: iniciante a intermediário.',
      imagem: 'https://i.pinimg.com/736x/63/2b/80/632b80cca4fbc8ba249392ee473236ea.jpg',
    },
    {
      id: 3,
      titulo: 'Inglês',
      descricao:
        'Aprenda a se comunicar em inglês, ampliando seu vocabulário e desenvolvendo habilidades de leitura, escrita, compreensão e conversação.',
      detalhes:  'Curso de inglês focado na comunicação prática, com desenvolvimento equilibrado de leitura, escrita, compreensão auditiva e conversação. Você ampliará seu vocabulário, dominará estruturas gramaticais essenciais e praticará situações reais do cotidiano e do ambiente profissional. Ao final, estará mais confiante para se expressar, entender conteúdos em inglês e aproveitar novas oportunidades acadêmicas e de carreira.',
      imagem: 'https://i.pinimg.com/736x/4b/7c/3d/4b7c3deddda4283e693a56bbf800e703.jpg',
    },
    {
      id: 4,
      titulo: 'Educação Financeira',
      descricao:
        'Aprenda a addministrar seu dinheiro, organizar seu orçamento e tomar decisões financeiras mais conscientes para alcançar seus objetivos.',
      detalhes: 'Curso que ensina a administrar o dinheiro de forma consciente e planejada. Você aprenderá a montar um orçamento, controlar gastos, evitar o endividamento, construir uma reserva de emergência e conhecer noções básicas de poupança e investimentos. Ao final, estará preparado para tomar decisões financeiras mais seguras e traçar metas de curto, médio e longo prazo.',
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