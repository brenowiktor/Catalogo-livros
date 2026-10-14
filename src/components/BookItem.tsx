import { useState } from "react";
import { deleteBook, updateBook } from "../services/api";
import type { BookItemProps } from "../types/book";

export default function BookItem({ book, onChanged }: BookItemProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      setError(null);
      await deleteBook(book._id);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao remover livro");
    }
  }

  // Opcional (PUT)
  async function handleToggleStatus() {
    try {
      setError(null);
      await updateBook({
        ...book,
        status: book.status === "lido" ? "não lido" : "lido",
      });
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar status");
    }
  }

  return (
    <li className="book-item">
        <div className="book-info">
        <strong>{book.title}</strong>
        <span className="book-author">{book.author}</span>
        <span className={`badge ${book.status === "lido" ? "lido" : "nao-lido"}`}>
            {book.status}
        </span>
        </div>

        <div className="book-actions">
        <button className="secondary" onClick={handleToggleStatus}>
            Alternar status
        </button>
        <button className="danger" onClick={handleDelete}>
            Remover
        </button>
        </div>

        {error && <p className="error">{error}</p>}
    </li>
  );
}