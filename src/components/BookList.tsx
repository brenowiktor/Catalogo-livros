import { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import type { Book, BookListProps } from "../types/book";
import BookItem from "./BookItem";

export default function BookList({ reloadKey, onChanged }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        setBooks(await getBooks());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar livros");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [reloadKey]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>Nenhum livro cadastrado.</p>;

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book._id} book={book} onChanged={onChanged} />
      ))}
    </ul>
  );
}