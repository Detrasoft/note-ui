import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, InputComponent, BadgeComponent } from '@detrasoft.com/detra-ng';
import { StorageAttachmentsComponent } from '@detrasoft.com/storage';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: Date;
  pinned: boolean;
  color?: string;
}

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    StorageAttachmentsComponent,
  ],
  template: `
    <div class="notes-dashboard">
      <div class="dashboard-header">
        <div>
          <h1 class="page-title">Minhas Anotações</h1>
          <p class="page-subtitle">Organize suas ideias, notas de reuniões e lembretes com sincronização em nuvem.</p>
        </div>
        <div class="header-actions">
          <ds-button variant="primary" (click)="openNewNote()">
            <i class="fa-solid fa-plus"></i> Nova Nota
          </ds-button>
        </div>
      </div>

      <!-- Quick note creator -->
      <div class="quick-creator" [class.expanded]="isCreating()">
        <input
          *ngIf="isCreating()"
          class="title-input"
          placeholder="Título da anotação..."
          [(ngModel)]="newNoteTitle"
        />
        <textarea
          class="content-input"
          placeholder="Criar uma nota..."
          [(ngModel)]="newNoteContent"
          (focus)="isCreating.set(true)"
          rows="3"
        ></textarea>
        
        <div *ngIf="isCreating()" class="creator-footer">
          <div class="footer-meta">
            <input
              class="category-input"
              placeholder="Tag / Categoria (ex: Trabalho, Ideias)"
              [(ngModel)]="newNoteCategory"
            />
          </div>
          <div class="footer-buttons">
            <ds-button variant="ghost" size="sm" (click)="cancelNewNote()">Cancelar</ds-button>
            <ds-button variant="primary" size="sm" (click)="saveNewNote()">Salvar</ds-button>
          </div>
        </div>
      </div>

      <!-- Notes Grid -->
      <div class="notes-grid">
        <div *ngFor="let note of notes()" class="note-card" [class.pinned]="note.pinned">
          <div class="note-card-header">
            <h3 class="note-title">{{ note.title || 'Sem título' }}</h3>
            <button class="pin-btn" (click)="togglePin(note)" [title]="note.pinned ? 'Desafixar' : 'Fixar'">
              <i class="fa-solid fa-thumbtack" [class.pinned-icon]="note.pinned"></i>
            </button>
          </div>
          <p class="note-body">{{ note.content }}</p>
          <div class="note-card-footer">
            <ds-badge size="sm" variant="info">{{ note.category }}</ds-badge>
            <span class="note-time">{{ note.updatedAt | date:'shortTime' }}</span>
          </div>

          <!-- DetraSoft Storage attachments preview for note -->
          <div class="note-attachments">
            <ds-storage-attachments
              folder="notes"
              [groupingKey]="note.id"
              [compact]="true"
              [readOnly]="true"
            ></ds-storage-attachments>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notes-dashboard {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.35rem 0;
      color: #F8FAFC;
    }
    .page-subtitle {
      font-size: 0.95rem;
      color: #94A3B8;
      margin: 0;
    }
    .quick-creator {
      max-width: 650px;
      margin: 0 auto;
      width: 100%;
      background: #131926;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 0.85rem 1.15rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      transition: all 0.2s ease;
    }
    .quick-creator.expanded {
      border-color: #3B82F6;
    }
    .title-input {
      width: 100%;
      background: transparent;
      border: none;
      color: #F8FAFC;
      font-size: 1.05rem;
      font-weight: 600;
      outline: none;
      margin-bottom: 0.5rem;
    }
    .content-input {
      width: 100%;
      background: transparent;
      border: none;
      color: #E2E8F0;
      font-size: 0.95rem;
      resize: none;
      outline: none;
      font-family: inherit;
    }
    .creator-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.75rem;
      padding-top: 0.65rem;
      border-top: 1px solid #1E293B;
    }
    .category-input {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #334155;
      color: #E2E8F0;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      font-size: 0.825rem;
      outline: none;
    }
    .footer-buttons {
      display: flex;
      gap: 0.5rem;
    }
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .note-card {
      background: #131926;
      border: 1px solid #1E293B;
      border-radius: 12px;
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .note-card:hover {
      transform: translateY(-2px);
      border-color: #334155;
    }
    .note-card.pinned {
      border-color: rgba(59, 130, 246, 0.4);
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.04) 0%, #131926 100%);
    }
    .note-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .note-title {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
      color: #F8FAFC;
    }
    .pin-btn {
      background: none;
      border: none;
      color: #64748B;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 0.2rem;
      transition: color 0.15s;
    }
    .pin-btn:hover {
      color: #E2E8F0;
    }
    .pinned-icon {
      color: #3B82F6;
    }
    .note-body {
      color: #CBD5E1;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
      flex: 1;
    }
    .note-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
      border-top: 1px solid #1E293B;
    }
    .note-time {
      font-size: 0.75rem;
      color: #64748B;
    }
    .note-attachments {
      margin-top: 0.25rem;
    }
  `]
})
export class NotesDashboardComponent {
  isCreating = signal<boolean>(false);
  newNoteTitle = '';
  newNoteContent = '';
  newNoteCategory = 'Geral';

  notes = signal<NoteItem[]>([
    {
      id: '1',
      title: 'Arquitetura dos Micro Frontends',
      content: 'Validação da integração das bibliotecas @detrasoft.com/web-auth, @detrasoft.com/storage, @detrasoft.com/billing e @detrasoft.com/support no DutFy Notes e Tabfy Forms.',
      category: 'Arquitetura',
      updatedAt: new Date(),
      pinned: true,
    },
    {
      id: '2',
      title: 'Notas da Reunião de Sprint',
      content: 'Alinhamento dos pacotes npm privados no Verdaccio e pipelines de publicação via GitHub Actions e Tailscale.',
      category: 'Reunião',
      updatedAt: new Date(Date.now() - 3600000),
      pinned: false,
    },
    {
      id: '3',
      title: 'Checklist de Deploy no K8s',
      content: '1. Namespace detrasoft\n2. StatefulSet Verdaccio\n3. PVC de persistência\n4. Token de publicação CI/CD',
      category: 'DevOps',
      updatedAt: new Date(Date.now() - 7200000),
      pinned: false,
    },
  ]);

  openNewNote() {
    this.isCreating.set(true);
  }

  cancelNewNote() {
    this.isCreating.set(false);
    this.newNoteTitle = '';
    this.newNoteContent = '';
  }

  saveNewNote() {
    if (!this.newNoteTitle && !this.newNoteContent) return;

    const newNote: NoteItem = {
      id: String(Date.now()),
      title: this.newNoteTitle || 'Sem título',
      content: this.newNoteContent,
      category: this.newNoteCategory || 'Geral',
      updatedAt: new Date(),
      pinned: false,
    };

    this.notes.update(curr => [newNote, ...curr]);
    this.cancelNewNote();
  }

  togglePin(note: NoteItem) {
    this.notes.update(curr =>
      curr.map(n => n.id === note.id ? { ...n, pinned: !n.pinned } : n)
    );
  }
}
