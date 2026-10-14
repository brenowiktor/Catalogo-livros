import type { Book, NewBook } from "../types/book";


export const API_URL = "https://crudcrud.com/api/fe61032a7d554b9b9e362e0f52b36a7f/livros";


async function checkResponse(res: Response) {
  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
  return res;
}

export async function getBooks(): Promise<Book[]> {
  const res = await checkResponse(await fetch(API_URL));
  return res.json();
}

export async function createBook(book: NewBook): Promise<Book> {
  const res = await checkResponse(
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
  );
  return res.json();
}

export async function deleteBook(id: string): Promise<void> {
  await checkResponse(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}

export async function updateBook(book: Book): Promise<void> {
  const { _id, ...data } = book; 
  await checkResponse(
    await fetch(`${API_URL}/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}