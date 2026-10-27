import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface RegistroNota {
  id: string;
  ano: number;
  nome: string;
  disciplina: string;
  nota1: number;
  nota2: number;
  media: number;
}

interface Relatorio {
  codigo: string;
  titulo: string;
  tipo: 'SECRETARIA' | 'PEDAGOGICO';
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-notas',
  styleUrl: './notas.css',
  templateUrl: './notas.html',
})
export class Notas {
  private fb = inject(FormBuilder);

  readonly anos = [2026, 2025, 2024];
  readonly tipos = ['TODOS', 'SECRETARIA', 'PEDAGOGICO'];
  readonly mediaAprovacao = 6;

  readonly relatorios: Relatorio[] = [
    { codigo: 'NOT_101', titulo: 'Boletim de Notas por Aluno', tipo: 'SECRETARIA' },
    { codigo: 'NOT_102', titulo: 'Média Geral por Disciplina', tipo: 'PEDAGOGICO' },
  ];

  anoSelecionado = signal(2026);
  tipoSelecionado = signal('TODOS');
  aviso = signal('');
  registros = signal<RegistroNota[]>([]);

  registrosDoAno = computed(() => this.registros().filter((r) => r.ano === this.anoSelecionado()));

  relatoriosFiltrados = computed(() =>
    this.relatorios.filter((r) => this.tipoSelecionado() === 'TODOS' || r.tipo === this.tipoSelecionado()),
  );

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    disciplina: ['', [Validators.required]],
    nota1: [null as number | null, [Validators.required, Validators.min(0), Validators.max(10)]],
    nota2: [null as number | null, [Validators.required, Validators.min(0), Validators.max(10)]],
  });

  get mediaAtual(): number | null {
    const { nota1, nota2 } = this.form.controls;
    if (nota1.valid && nota2.valid && nota1.value !== null && nota2.value !== null) {
      return (nota1.value + nota2.value) / 2;
    }
    return null;
  }

  mudarAno(valor: string) {
    this.anoSelecionado.set(Number(valor));
    this.aviso.set('');
  }

  mudarTipo(valor: string) {
    this.tipoSelecionado.set(valor);
  }

  invalido(campo: 'nome' | 'disciplina' | 'nota1' | 'nota2'): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  formatar(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, disciplina, nota1, nota2 } = this.form.getRawValue();
    const media = (nota1! + nota2!) / 2;

    this.registros.update((lista) => [
      ...lista,
      {
        id: crypto.randomUUID(),
        ano: this.anoSelecionado(),
        nome: nome!.trim(),
        disciplina: disciplina!.trim(),
        nota1: nota1!,
        nota2: nota2!,
        media,
      },
    ]);

    this.aviso.set('');
    this.form.reset();
  }

  remover(id: string) {
    this.registros.update((lista) => lista.filter((r) => r.id !== id));
  }

  emitir(relatorio: Relatorio) {
    const dados = this.registrosDoAno();
    if (dados.length === 0) {
      this.aviso.set(`Não há notas lançadas em ${this.anoSelecionado()} para emitir o relatório.`);
      return;
    }
    this.aviso.set('');

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${relatorio.codigo} - ${relatorio.titulo}`, 14, 18);
    doc.setFontSize(10);
    doc.text(
      `Ano: ${this.anoSelecionado()}   |   Tipo: ${relatorio.tipo}   |   Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
      14,
      25,
    );

    const estilo = { fillColor: [23, 129, 154] as [number, number, number] };

    if (relatorio.codigo === 'NOT_101') {
      autoTable(doc, {
        startY: 32,
        head: [['Aluno', 'Disciplina', 'Nota 1', 'Nota 2', 'Média', 'Situação']],
        body: dados.map((r) => [
          r.nome,
          r.disciplina,
          this.formatar(r.nota1),
          this.formatar(r.nota2),
          this.formatar(r.media),
          r.media >= this.mediaAprovacao ? 'Aprovado' : 'Reprovado',
        ]),
        headStyles: estilo,
      });
    } else {
      const grupos = new Map<string, number[]>();
      dados.forEach((r) => grupos.set(r.disciplina, [...(grupos.get(r.disciplina) ?? []), r.media]));

      autoTable(doc, {
        startY: 32,
        head: [['Disciplina', 'Nº de alunos', 'Média da turma']],
        body: [...grupos].map(([disc, medias]) => [
          disc,
          String(medias.length),
          this.formatar(medias.reduce((a, b) => a + b, 0) / medias.length),
        ]),
        headStyles: estilo,
      });
    }

    doc.save(`${relatorio.codigo}_${this.anoSelecionado()}.pdf`);
  }
}