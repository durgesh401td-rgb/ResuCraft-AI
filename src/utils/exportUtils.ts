import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

// 1. Browser Native High-Fidelity Print / Save as PDF
export function triggerPrint(): void {
  window.print();
}

// 2. Direct 1-Click Client-Side PDF Generation using html2canvas & jsPDF
export async function downloadPdfFromElement(
  elementId: string,
  fileName = 'Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // Generate high-resolution canvas (scale 2 for retina / print clarity)
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate height in mm to maintain aspect ratio
    const imgHeightInMm = (canvasHeight * pdfWidth) / canvasWidth;

    let heightLeft = imgHeightInMm;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInMm, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page support if resume exceeds one page
    while (heightLeft > 5) {
      position = position - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInMm, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Failed to export PDF:', err);
    // Fallback to native print
    window.print();
    return false;
  }
}

// 3. Export Resume as JSON
export function exportToJson(resume: ResumeData, filename = 'resume-data.json'): void {
  const jsonStr = JSON.stringify(resume, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 4. Export Resume as Plain Text (ATS-friendly text format)
export function exportToPlainText(resume: ResumeData): string {
  const lines: string[] = [];

  // Personal Info
  lines.push(resume.personalInfo.fullName.toUpperCase());
  if (resume.personalInfo.jobTitle) lines.push(resume.personalInfo.jobTitle);
  const contacts = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
    resume.personalInfo.website
  ].filter(Boolean);
  lines.push(contacts.join(' | '));
  lines.push('\n' + '='.repeat(60) + '\n');

  // Summary
  if (resume.activeSections.summary && resume.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('-'.repeat(30));
    lines.push(resume.summary);
    lines.push('\n');
  }

  // Skills
  if (resume.activeSections.skills && resume.skillCategories.length > 0) {
    lines.push('TECHNICAL SKILLS');
    lines.push('-'.repeat(30));
    resume.skillCategories.forEach(cat => {
      if (cat.skills.length > 0) {
        lines.push(`${cat.categoryName}: ${cat.skills.join(', ')}`);
      }
    });
    lines.push('\n');
  }

  // Experience
  if (resume.activeSections.experience && resume.experience.length > 0) {
    lines.push('WORK EXPERIENCE');
    lines.push('-'.repeat(30));
    resume.experience.forEach(exp => {
      lines.push(`${exp.role} — ${exp.company} (${exp.location})`);
      lines.push(`${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`);
      exp.bullets.forEach(b => lines.push(`  • ${b}`));
      lines.push('');
    });
  }

  // Projects
  if (resume.activeSections.projects && resume.projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('-'.repeat(30));
    resume.projects.forEach(p => {
      lines.push(`${p.title} [${p.techStack}]`);
      if (p.link || p.github) lines.push(`  Links: ${[p.link, p.github].filter(Boolean).join(' | ')}`);
      p.bullets.forEach(b => lines.push(`  • ${b}`));
      lines.push('');
    });
  }

  // Education
  if (resume.activeSections.education && resume.education.length > 0) {
    lines.push('EDUCATION');
    lines.push('-'.repeat(30));
    resume.education.forEach(edu => {
      lines.push(`${edu.degree} in ${edu.fieldOfStudy} — ${edu.institution}`);
      lines.push(`${edu.startDate} – ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`);
      if (edu.bullets && edu.bullets.length > 0) {
        edu.bullets.forEach(b => lines.push(`  • ${b}`));
      }
      lines.push('');
    });
  }

  // Certifications
  if (resume.activeSections.certifications && resume.certifications.length > 0) {
    lines.push('CERTIFICATIONS');
    lines.push('-'.repeat(30));
    resume.certifications.forEach(cert => {
      lines.push(`• ${cert.name} — ${cert.issuer} (${cert.date})`);
    });
    lines.push('\n');
  }

  // Awards
  if (resume.activeSections.awards && resume.awards.length > 0) {
    lines.push('HONORS & AWARDS');
    lines.push('-'.repeat(30));
    resume.awards.forEach(aw => {
      lines.push(`• ${aw.title} — ${aw.issuer} (${aw.date})`);
      if (aw.description) lines.push(`  ${aw.description}`);
    });
    lines.push('\n');
  }

  return lines.join('\n');
}
