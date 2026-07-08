import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (data, title, fileName) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Table
  autoTable(doc, {
    startY: 30,

    head: [["Title", "Amount", "Category", "Date"]],

    body: data.map((item) => [
      item.title,
      item.amount,
      item.category,
      new Date(item.date).toLocaleDateString(),
    ]),
  });

  doc.save(`${fileName}.pdf`);
};
