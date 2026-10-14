import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

export default function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const reload = () => setReloadKey((k) => k + 1);

  return (
    <main className="container">
      <h1>Catálogo de Livros</h1>
      <BookForm onChanged={reload} />
      <BookList reloadKey={reloadKey} onChanged={reload} />
    </main>
  );
}