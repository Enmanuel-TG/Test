"use client";

import { getNota } from "@/app/helpers/nota";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
  content: string;
}

const Page = () => {
  const [nota, setNota] = useState<Props | null>(null);

  useEffect(() => {
    const fetchNota = async () => {
      const response = await getNota("");
      setNota(response.data);
    };
    fetchNota();
  }, []);

  if (!nota) return <div>Cargando...</div>;
  console.log(nota);
  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{nota.title}</h2>
      <p className="text-gray-600 mt-2">{nota.content}</p>
    </div>
  );
};

export default Page;
