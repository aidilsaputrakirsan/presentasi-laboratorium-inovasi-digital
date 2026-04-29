import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Export elemen DOM ke PDF.
 * @param {HTMLElement} element - Elemen yang akan di-capture
 * @param {string} filename - Nama file PDF (tanpa .pdf)
 * @param {Object} options
 * @param {string} options.orientation - 'portrait' | 'landscape' (default: 'landscape')
 * @param {string} options.title - Judul yang ditampilkan di header PDF
 * @param {string} options.subtitle - Subjudul di bawah judul
 */
export async function exportToPDF(element, filename = 'laporan', options = {}) {
  const {
    orientation = 'landscape',
    title = '',
    subtitle = ''
  } = options

  try {
    // Capture elemen dengan skala 2x untuk kualitas lebih baik
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    })

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Header area
    const headerHeight = title ? 18 : 4
    const contentY = headerHeight + 2
    const availableHeight = pdfHeight - contentY - 6

    // Tulis header jika ada judul
    if (title) {
      // Background header strip
      pdf.setFillColor(30, 41, 59) // slate-800
      pdf.rect(0, 0, pdfWidth, headerHeight, 'F')

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(title, 8, 8)

      if (subtitle) {
        pdf.setFontSize(7)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(148, 163, 184) // slate-400
        pdf.text(subtitle, 8, 14)
      }

      // Tanggal export di kanan
      const now = new Date()
      const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      pdf.setFontSize(7)
      pdf.setTextColor(148, 163, 184)
      pdf.text(`Diekspor: ${dateStr}`, pdfWidth - 8, 8, { align: 'right' })
    }

    // Hitung ukuran gambar agar pas di halaman
    const imgRatio = canvas.width / canvas.height
    const pageRatio = pdfWidth / availableHeight

    let imgWidth, imgHeight
    if (imgRatio > pageRatio) {
      imgWidth = pdfWidth - 8
      imgHeight = imgWidth / imgRatio
    } else {
      imgHeight = availableHeight
      imgWidth = imgHeight * imgRatio
    }

    const xOffset = (pdfWidth - imgWidth) / 2

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', xOffset, contentY, imgWidth, imgHeight)

    // Footer
    pdf.setFontSize(6)
    pdf.setTextColor(148, 163, 184)
    pdf.text('SINTA-Pulse Dashboard — Laboratorium Inovasi Digital', 8, pdfHeight - 3)
    pdf.text(`Halaman 1`, pdfWidth - 8, pdfHeight - 3, { align: 'right' })

    pdf.save(`${filename}.pdf`)
  } catch (err) {
    console.error('Export PDF gagal:', err)
    throw err
  }
}
