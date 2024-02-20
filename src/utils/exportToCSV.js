import Papa from 'papaparse';

function exportToCSV(intakeList) {
  const csvData = Papa.unparse(intakeList);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'intake_report.csv';
  link.click();
}

export default exportToCSV;