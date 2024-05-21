import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPdf = async (elementId: string, fileName: string) => {
  // Get the DOM element to export
  const element: any = document.getElementById(elementId);

  // Convert the element to a canvas
  const canvas = await html2canvas(element);

  // Create a PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });

  // Calculate width and height of the canvas
  const { width, height } = canvas;

  // Add the canvas image to the PDF document
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);

  // Save the PDF
  pdf.save(fileName);
};
