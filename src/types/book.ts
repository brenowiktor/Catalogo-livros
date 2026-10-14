export type BookStatus = "lido" | "não lido";

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export type NewBook = Omit<Book, "_id">;

export interface BookItemProps {
  book: Book;
  onChanged: () => void; 
}

export interface BookListProps {
  reloadKey: number; 
  onChanged: () => void;
}

export interface BookFormProps {
  onChanged: () => void;
}