"use client";
import { useEffect, useRef, useState } from "react";
import { getAllNotas, deleteNota } from "../helpers/nota";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type Nota = {
  id: string;
  title: string;
  content: string;
};

export const NotaGrid = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchNotas = async () => {
      const data = await getAllNotas();
      setNotas(data);
    };
    fetchNotas();
  }, []);

  const handleDownload = async (nota: Nota) => {
    const element = contentRefs.current[nota.id];
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${nota.title}.pdf`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {notas.map((nota) => (
        <div
          key={nota.id}
          className="p-4 flex justify-between bg-gray-100 rounded shadow"
        >
          <div className="w-full pr-4">
            <h2 className="font-bold text-lg mb-2">{nota.title}</h2>
            <div
              className="prose bg-white p-2 rounded"
              ref={(el) => { contentRefs.current[nota.id] = el; }}
            >
              <ReactMarkdown>{nota.content}</ReactMarkdown>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={() => deleteNota(nota.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
            <button
              onClick={() => handleDownload(nota)}
              className="text-blue-600 hover:underline"
            >
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
