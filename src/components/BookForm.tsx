import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createBook } from "../services/api";
import type { BookFormProps, BookStatus, NewBook } from "../types/book";

const initialState: NewBook = { title: "", author: "", status: "não lido" };

export default function BookForm({ onChanged }: BookFormProps) {
  const [form, setForm] = useState<NewBook>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as BookStatus) : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError("Preencha título e autor.");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      await createBook(form);
      setForm(initialState);
      onChanged(); // recarrega a lista
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar livro");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
      <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="não lido">Não lido</option>
        <option value="lido">Lido</option>
      </select>
      <button type="submit" disabled={saving}>
        {saving ? "Salvando..." : "Adicionar"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}