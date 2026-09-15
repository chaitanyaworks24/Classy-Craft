import { jsPDF } from "jspdf";
import { companyConfig, companyTheme } from "@/data/company";

export interface EstimateData {
  customerName: string;
  phone: string;
  homeType: string;
  sqft?: number;
  spaces: string[];
  finishTier: string;
  timeline: string;
  cityLocality: string;
  budget?: string;
  minEstimate: number;
  maxEstimate: number;
}

export function generateEstimatePdf(data: EstimateData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Colors
  const charcoal = companyTheme.charcoal || "#1A1A1A";
  const gold = companyTheme.gold || "#C5A059";
  const gray = companyTheme.muted || "#6D6B66";

  // Header - Studio Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(charcoal);
  doc.text(companyConfig.name.toUpperCase(), 20, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(gray);
  doc.text(companyConfig.address, 20, y);
  y += 5;
  doc.text(`${companyConfig.website}  |  ${companyConfig.phone}`, 20, y);

  // Divider
  y += 10;
  doc.setDrawColor(229, 226, 218); // Stone color
  doc.setLineWidth(0.5);
  doc.line(20, y, pageWidth - 20, y);

  // Title
  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(charcoal);
  doc.text("INTERIOR ESTIMATE", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const dateStr = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(`Date: ${dateStr}`, pageWidth - 20, y, { align: "right" });

  y += 15;

  // Customer Info Box
  doc.setFillColor(249, 247, 242); // Ivory
  doc.rect(20, y, pageWidth - 40, 25, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(charcoal);
  doc.text("PREPARED FOR:", 25, y + 8);
  
  doc.setFont("helvetica", "normal");
  doc.text(data.customerName, 25, y + 15);
  doc.text(data.phone, 25, y + 20);

  y += 40;

  // Project Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(gold);
  doc.text("PROJECT SCOPE", 20, y);
  
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(charcoal);

  const details = [
    ["Home Configuration:", data.homeType + (data.sqft ? ` (~${data.sqft} sq.ft)` : "")],
    ["Location:", data.cityLocality],
    ["Spaces in Scope:", data.spaces.join(", ")],
    ["Finish Tier:", data.finishTier],
    ["Timeline:", data.timeline]
  ];

  if (data.budget) {
    details.push(["Preferred Budget:", data.budget]);
  }

  details.forEach(([label, val]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 20, y);
    doc.setFont("helvetica", "normal");
    
    // Auto-wrap long text like spaces array
    const splitText = doc.splitTextToSize(val, pageWidth - 80);
    doc.text(splitText, 65, y);
    
    y += (splitText.length * 6) + 4;
  });

  // Divider
  y += 5;
  doc.setDrawColor(229, 226, 218);
  doc.line(20, y, pageWidth - 20, y);
  y += 15;

  // Estimate Range
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(gold);
  doc.text("INDICATIVE ESTIMATE", 20, y);

  y += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(charcoal);
  doc.text(`Rs. ${data.minEstimate}L - Rs. ${data.maxEstimate}L`, 20, y);

  y += 15;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(gray);
  const disclaimer = "This is an indicative estimate. Final pricing may vary based on actual site measurements, specific material selections, custom design requirements, hardware choices, site conditions, taxes, and final execution scope.";
  doc.text(doc.splitTextToSize(disclaimer, pageWidth - 40), 20, y);

  // Footer / CTA
  y = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(229, 226, 218);
  doc.line(20, y, pageWidth - 20, y);
  
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(charcoal);
  doc.text("Ready to discuss your project in detail?", 20, y);
  
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Reach us on WhatsApp: ${companyConfig.phone}`, 20, y);

  doc.save(`Interior_Estimate_${data.customerName.replace(/\s+/g, '_')}.pdf`);
}
