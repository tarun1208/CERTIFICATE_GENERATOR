function generateCertificates() {

  const templateId = "1eQnQdUUiuXpxS4dR1Sv2k_3vIoAEZ9axVOw6u8SIY68"; // SLIDE ID
  const folderId = "19kgIYprDXWzBjaWf6FdzlUJSsNYFAZor"; // OUTPUT FOLDER

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  const folder = DriveApp.getFolderById(folderId);

  for (let i = 1; i < data.length; i++) {

    let name = data[i][0]; // First column

    // Copy template here
    let copy = DriveApp.getFileById(templateId).makeCopy(name, folder);

    // Open slide
    let presentation = SlidesApp.openById(copy.getId());

    // It will replay the Names which are present in sheet
    presentation.replaceAllText("{{Name}}", name);

    presentation.saveAndClose();

    // Convert Slide to PDF
    let pdf = copy.getAs("application/pdf");

    // Save PDF
    folder.createFile(pdf).setName(name + ".pdf");

    // Delete temporary slide
    DriveApp.getFileById(copy.getId()).setTrashed(true);
  }

  Logger.log("✅ Certificates Generated Successfully!");
}
