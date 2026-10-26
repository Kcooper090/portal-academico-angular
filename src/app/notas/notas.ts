import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface RegistroNota {
  nome: string;
  disciplina: string;
  nota1: number;
  nota2: number;
  media: number;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-notas',
  styleUrl: './notas.css',
  templateUrl: './notas.html',
})
export class Notas {
  private fb = inject(FormBuilder);

  registros = signal<RegistroNota[]>([]);

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
      { nome: nome!.trim(), disciplina: disciplina!.trim(), nota1: nota1!, nota2: nota2!, media },
    ]);

    this.form.reset();
  }

  remover(indice: number) {
    this.registros.update((lista) => lista.filter((_, i) => i !== indice));
  }
}