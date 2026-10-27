import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Aluno {
  matricula: string;
  email: string;
  curso: string;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-alunos',
  styleUrl: './alunos.css',
  templateUrl: './alunos.html',
})
export class Alunos {
  cursos = ['Engenharia de Software', 'Ciência da Computação', 'Sistemas de Informação', 'Direito', 'Administração'];

  // Lista de alunos cadastrados
  alunos: Aluno[] = [];
  mensagem = '';

  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      matricula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required],
    });
  }

  get matricula() { return this.formulario.controls.matricula; }
  get email() { return this.formulario.controls.email; }
  get curso() { return this.formulario.controls.curso; }

  cadastrarAluno(): void {
    this.mensagem = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const novo = this.formulario.getRawValue() as Aluno;

    if (this.alunos.some(a => a.matricula === novo.matricula)) {
      this.mensagem = 'Já existe um aluno com essa matrícula.';
      return;
    }

    this.alunos.push(novo);
    this.formulario.reset({ matricula: '', email: '', curso: '' });
    this.mensagem = 'Aluno cadastrado com sucesso!';
  }

  remover(matricula: string): void {
    this.alunos = this.alunos.filter(a => a.matricula !== matricula);
  }
}
