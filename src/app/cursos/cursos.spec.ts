import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cursos } from './cursos';

describe('Cursos', () => {
  let component: Cursos;
  let fixture: ComponentFixture<Cursos>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cursos],
    }).compileComponents();

    fixture = TestBed.createComponent(Cursos);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar um card para cada curso da lista', () => {
    const cards = el.querySelectorAll('.card');
    expect(cards.length).toBe(component.cursos.length);
  });

  it('deve mostrar o título de cada curso', () => {
    const titulos = Array.from(el.querySelectorAll('.card__titulo')).map(
      (t) => t.textContent?.trim()
    );
    expect(titulos).toEqual(component.cursos.map((c) => c.titulo));
  });

  it('não deve mostrar o modal no início', () => {
    expect(component.selecionado()).toBeNull();
    expect(el.querySelector('.modal')).toBeNull();
  });

  it('deve abrir o modal com os detalhes ao clicar em "Ver detalhes"', () => {
    const botoes = el.querySelectorAll<HTMLButtonElement>('.card .btn');
    botoes[1].click();
    fixture.detectChanges();

    expect(component.selecionado()?.id).toBe(2);

    const modal = el.querySelector('.modal');
    expect(modal).not.toBeNull();
    expect(modal?.querySelector('h2')?.textContent).toContain('Curso 2');
    expect(modal?.querySelector('p')?.textContent).toContain('Texto completo do Curso 2.');
  });

  it('deve fechar o modal ao clicar em "Fechar"', () => {
    el.querySelector<HTMLButtonElement>('.card .btn')!.click();
    fixture.detectChanges();

    el.querySelector<HTMLButtonElement>('.modal .btn')!.click();
    fixture.detectChanges();

    expect(component.selecionado()).toBeNull();
    expect(el.querySelector('.modal')).toBeNull();
  });

  it('deve fechar o modal ao clicar no fundo escuro', () => {
    component.verDetalhes(component.cursos[0]);
    fixture.detectChanges();

    el.querySelector<HTMLElement>('.overlay')!.click();
    fixture.detectChanges();

    expect(el.querySelector('.modal')).toBeNull();
  });
});
