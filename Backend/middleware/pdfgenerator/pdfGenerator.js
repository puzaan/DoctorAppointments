const fs = require("fs");
const path = require("path");
// const { readFile, writeFile, copyFile } = require("fs/promises");
//const { degrees, PDFDocument, rgb, StandardFonts, PDFContext }=require('pdf-lib');
const PDFDocument = require("pdfkit");

async function generatePdfFunction(
  filename,
  fullName,
  MBBS,
  NMC_number,
  patient,
  prescription
) {
  // console.log(filename, fullName, MBBS, NMC_number, patient);

  // // Create a document
  const doc = new PDFDocument();

  try {
    fs.copyFile(
      "middleware/pdfgenerator/Prescription.pdf",
      "middleware/pdfgenerator/prescriptionFile/" + filename + ".pdf",
      (error) => {
        if (error) {
          res.status(400).json({ msg: "Error in making pdf file" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ msg: "Error in making pdf file" });
  }
  //   if(error){console.log("Error in reading file");};
  // });

  // // Pipe its output somewhere, like to a file or HTTP response
  // // See below for browser usage
  let constPath =
    "./middleware/pdfgenerator/prescriptionFile/" + filename + ".pdf";
  doc.pipe(fs.createWriteStream(constPath, { flags: "a" }));
  let fileAddress = constPath;

  // Embed a font, set the font size, and render some text
  doc.image("./middleware/pdfgenerator/xybImage.png", 1, 1, {
    width: 620,
    height: 720,
  });

  doc.fontSize(10).text(patient["patientName"], 90, 192);
  doc.fontSize(10).text(patient["age"], 315, 193); //+textData["prescription"]["patientName"]
  doc.fontSize(10).text("/  " + patient["gender"], 363, 193); //+textData["prescription"]["Ward"]
  doc.fontSize(10).text(patient["occupation"], 130, 219); //+textData["prescription"]["dob"]
  doc.fontSize(10).text(patient["address"], 317, 218); //+textData["prescription"]["gender"]
  doc.fontSize(10).text(patient["phoneNumber"], 490, 218); //+textData["prescription"]["bedNo"]
  doc.fontSize(10).text("         " + prescription["complaints"], 10, 300); //+textData["prescription"]["inPatientNo"]
  doc.fontSize(10).text("         " + prescription["observation"], 10, 433); //+textData["prescription"]["unit"]
  doc.fontSize(10).text("         " + prescription["advise"], 10, 549); //+textData["prescription"]["consultant"]
  doc.fontSize(8).text(fullName, 483, 674); //+textData["prescription"]["diagnosis"]
  doc.fontSize(8).text(MBBS, 440, 690); //+textData["prescription"]["chiefComplaint"]
  doc.fontSize(8).text(NMC_number, 448, 706); //+textData["prescription"]["historyOfPresentIllness"]
  // Add an image, constrain it to a given size, and center it vertically and horizontally

  // Add another page
  // doc
  //   .addPage()
  //   .fontSize(25)
  //   .text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  // doc
  //   .save()
  //   .moveTo(100, 150)
  //   .lineTo(100, 250)
  //   .lineTo(200, 250)
  //   .fill('#FF3300');

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  // doc
  //   .scale(0.6)
  //   .translate(470, -380)
  //   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  //   .fill('red', 'even-odd')
  //   .restore();

  // Add some text with annotations
  // doc
  //   .addPage()
  //   .fillColor('blue')
  //   .text('Here is a link!', 100, 100)
  //   .underline(100, 100, 160, 27, { color: '#0000FF' })
  //   .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();
  return fileAddress;
}
module.exports = { generatePdfFunction };
