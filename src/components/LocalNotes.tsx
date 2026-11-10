import type { ReactNode } from "react";

interface LocalNotesProps {
  title: string;
  notes: { id?: string; summary: string; children: ReactNode }[];
}

export default function LocalNotes({ title, notes }: LocalNotesProps) {
  return (
    <div className="site-local-notes">
      <h3>{title}</h3>
      <div className="site-disclosures">{notes.map((note) => <details id={note.id} key={note.id ?? note.summary}><summary>{note.summary}</summary><div>{note.children}</div></details>)}</div>
    </div>
  );
}
