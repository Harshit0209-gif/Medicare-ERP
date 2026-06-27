import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ORG = {
  name:  'GOBT ERP',
  sub:   'Medical Inventory Management System',
  email: 'admin@gobt-erp.com',
  phone: '+91 22 4567 8900',
};

/* Page constants */
const W  = 210;   // A4 width (mm)
const M  = 18;    // left / right margin
const CW = W - M * 2;   // content width = 174

/* Colour palette */
const C = {
  dark:   [15,  23,  42],
  mid:    [51,  65,  85],
  muted:  [100, 116, 139],
  light:  [148, 163, 184],
  border: [226, 232, 240],
  bg:     [248, 250, 252],
  white:  [255, 255, 255],
  green:  [16,  185, 129],
  amber:  [245, 158, 11],
  red:    [239, 68,  68],
};

function fmt(n) {
  const num = Number(n);
  const abs = Math.abs(num);
  const str = abs.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return num < 0 ? `- Rs. ${str}` : `Rs. ${str}`;
}

function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function statusClr(status) {
  return { Paid: C.green, Pending: C.amber, Overdue: C.red }[status] ?? C.muted;
}

/* ─── Invoice PDF ──────────────────────────────────────────────── */
export function downloadInvoicePDF(invoice) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  /* ══════════════════════════════════════════════════════════════
     HEADER BAND  (spans full width, 46 mm tall)
     Left  → company name + subtitle + contact
     Right → "TAX INVOICE" label + invoice ID + date
     ══════════════════════════════════════════════════════════════ */
  doc.setFillColor(...C.dark);
  doc.rect(0, 0, W, 46, 'F');

  /* Left – brand */
  doc.setTextColor(...C.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(ORG.name, M, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.light);
  doc.text(ORG.sub, M, 24.5);

  doc.setFontSize(7.5);
  doc.text(`${ORG.email}  ·  ${ORG.phone}`, M, 31);

  /* Right – invoice identity */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...C.white);
  doc.text('TAX INVOICE', W - M, 17, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.light);
  doc.text(invoice.id,          W - M, 25, { align: 'right' });
  doc.text(fmtDate(invoice.date), W - M, 31, { align: 'right' });

  /* ══════════════════════════════════════════════════════════════
     BILL TO (left)  +  INVOICE DETAILS (right)
     Two equal columns with a 10 mm gutter between them
     ══════════════════════════════════════════════════════════════ */
  const COL  = (CW - 10) / 2;      // single column width ≈ 82 mm
  const LX   = M;                   // left column x
  const RX   = M + COL + 10;        // right column x ≈ 110
  const BOX_H = 26;                 // shared box height (mm)

  let y = 56;

  /* --- Section labels --- */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...C.muted);
  doc.text('BILL TO',          LX, y);
  doc.text('INVOICE DETAILS',  RX, y);

  y += 4;

  /* --- Left box: customer info --- */
  doc.setFillColor(...C.bg);
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.25);
  doc.roundedRect(LX, y, COL, BOX_H, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.dark);
  doc.text(invoice.customer, LX + 4, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const lRow = (label, value, rowY) => {
    doc.setTextColor(...C.muted);
    doc.text(label, LX + 4, rowY);
    doc.setTextColor(...C.dark);
    doc.text(String(value ?? '—'), LX + 34, rowY);
  };
  lRow('Customer Type',  invoice.type,  y + 14);
  lRow('Items Supplied', invoice.items, y + 20);

  /* --- Right box: invoice meta --- */
  doc.setFillColor(...C.bg);
  doc.setDrawColor(...C.border);
  doc.roundedRect(RX, y, COL, BOX_H, 2, 2, 'FD');

  const rRow = (label, value, rowY, valColor) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(label, RX + 4, rowY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...(valColor ?? C.dark));
    doc.text(String(value ?? '—'), W - M - 2, rowY, { align: 'right' });
  };
  rRow('Invoice Number', invoice.id,            y + 7);
  rRow('Invoice Date',   fmtDate(invoice.date),  y + 14);
  rRow('Status',         (invoice.status ?? '—').toUpperCase(), y + 20, statusClr(invoice.status));

  y += BOX_H + 10;

  /* ══════════════════════════════════════════════════════════════
     LINE-ITEMS TABLE
     ══════════════════════════════════════════════════════════════ */
  const desc =
    `Pharmaceutical Products — ${invoice.customer}\n` +
    `(${invoice.items} item${invoice.items > 1 ? 's' : ''} supplied)`;

  autoTable(doc, {
    startY: y,
    margin: { left: M, right: M },
    head: [['#', 'Description', 'Qty', 'Unit Rate', 'Amount']],
    body: [['01', desc, String(invoice.items), fmt(invoice.subtotal / invoice.items), fmt(invoice.subtotal)]],
    styles: {
      font:        'helvetica',
      fontSize:    9,
      cellPadding: 4,
      textColor:   C.dark,
      lineColor:   C.border,
      lineWidth:   0.2,
    },
    headStyles: {
      fillColor:  C.dark,
      textColor:  C.white,
      fontSize:   8,
      fontStyle:  'bold',
      halign:     'left',
    },
    columnStyles: {
      0: { cellWidth: 12,  halign: 'center' },
      2: { cellWidth: 14,  halign: 'center' },
      3: { cellWidth: 35,  halign: 'right' },
      4: { cellWidth: 35,  halign: 'right' },
    },
    alternateRowStyles: { fillColor: C.bg },
  });

  y = doc.lastAutoTable.finalY + 10;

  /* ══════════════════════════════════════════════════════════════
     TOTALS BLOCK  (right-aligned, consistent columns)
     LabelX = fixed left edge of label text
     ValX   = right edge (W − margin) for amount values
     ══════════════════════════════════════════════════════════════ */
  const LabelX = W - M - 74;   // ≈ 118 mm
  const ValX   = W - M;         // 192 mm

  /* Thin rule above totals */
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.3);
  doc.line(LabelX, y - 3, ValX, y - 3);

  const totRow = (label, value) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.muted);
    doc.text(label, LabelX, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C.dark);
    doc.text(value, ValX, y, { align: 'right' });
    y += 6.5;
  };

  totRow('Subtotal',   fmt(invoice.subtotal));
  totRow('Discount',   fmt(-Math.abs(invoice.discount)));
  totRow('GST / Tax',  fmt(invoice.tax));

  /* Rule before grand total */
  doc.setDrawColor(...C.border);
  doc.line(LabelX, y - 1, ValX, y - 1);
  y += 2;

  /* Grand total pill */
  const pillX = LabelX - 4;
  const pillW = ValX - pillX;
  doc.setFillColor(...C.dark);
  doc.roundedRect(pillX, y - 1, pillW, 11, 2, 2, 'F');

  doc.setTextColor(...C.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TOTAL DUE', pillX + 5, y + 6.5);
  doc.setFontSize(11);
  doc.text(fmt(invoice.total), ValX - 3, y + 6.5, { align: 'right' });

  y += 18;

  /* ══════════════════════════════════════════════════════════════
     PAYMENT ROW  (two halves, vertical divider)
     ══════════════════════════════════════════════════════════════ */
  doc.setFillColor(...C.bg);
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.25);
  doc.roundedRect(M, y, CW, 19, 2, 2, 'FD');

  const half = CW / 2;

  /* Left half – method */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...C.muted);
  doc.text('PAYMENT METHOD', M + 4, y + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...C.dark);
  doc.text(invoice.paymentMethod || '—', M + 4, y + 14);

  /* Vertical divider */
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.25);
  doc.line(M + half, y + 3, M + half, y + 16);

  /* Right half – status */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...C.muted);
  doc.text('PAYMENT STATUS', M + half + 5, y + 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...statusClr(invoice.status));
  doc.text((invoice.status || '—').toUpperCase(), M + half + 5, y + 14);

  y += 27;

  /* ══════════════════════════════════════════════════════════════
     FOOTER
     ══════════════════════════════════════════════════════════════ */
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y);
  y += 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(...C.light);
  doc.text(
    'This is a system-generated invoice and does not require a physical signature.',
    W / 2, y, { align: 'center' },
  );
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${ORG.name}  ·  ${ORG.email}  ·  ${ORG.phone}`,
    W / 2, y, { align: 'center' },
  );

  doc.save(`${invoice.id}.pdf`);
}

/* ─── Generic CSV download ────────────────────────────────────── */
export function downloadCSV(headers, keys, rows, filename) {
  const lines = [
    headers.join(','),
    ...rows.map((r) => keys.map((k) => `"${r[k] ?? ''}"`).join(',')),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
