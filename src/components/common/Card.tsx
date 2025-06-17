import React from 'react';

interface CardProps {
  title: string;
  children?: React.ReactNode; // Adicionando 'children' para permitir conteúdo interno
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg bg-neutral-800 text-card-foreground shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div>
        {children} {/* Aqui é onde o conteúdo filho será renderizado */}
      </div>
    </div>
  );
}