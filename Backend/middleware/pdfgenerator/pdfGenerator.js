

const fs = require('fs');
const path=require("path");
const {readFile,writeFile}=require("fs/promises")
//const { degrees, PDFDocument, rgb, StandardFonts, PDFContext }=require('pdf-lib');
const PDFDocument = require('pdfkit');


async function generatePdfFunction(filename,doctor,patient,prescription) {
  
console.log(filename,doctor,patient);


// // Create a document
 const doc = new PDFDocument() ;
 try {
 fs.copyFile("middleware/pdfgenerator/Prescription.pdf","middleware/pdfgenerator/prescriptionFile/"+filename+".pdf",(error)=>{
  if(error){ 
  res.status(400).json({"msg":"Error in making pdf file"});
  }
 });
  
 } catch (error) {
  res.status(400).json({"msg":"Error in making pdf file"});
 }
 //   if(error){console.log("Error in reading file");};
// });

// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
let constPath="./middleware/pdfgenerator/prescriptionFile/"+filename+".pdf";
doc.pipe(fs.createWriteStream(constPath,{flags:'a'}));
let fileAddress=constPath;

// Embed a font, set the font size, and render some text
doc.image('./middleware/pdfgenerator/xybImage.png',10,10,{
  width:535,
  height:710
  
});

  doc.fontSize(10)
  .text(patient["patientName"], 100, 197);
  doc.fontSize(10)
  .text(patient["age"], 300, 197);//+textData["prescription"]["patientName"]
  doc.fontSize(10)
  .text("/"+patient["gender"], 345, 197);//+textData["prescription"]["Ward"]
  doc.fontSize(10)
  .text(patient["occupation"], 130, 225);//+textData["prescription"]["dob"]
  doc.fontSize(10
    )
  .text(patient["address"], 282, 225);//+textData["prescription"]["gender"]
  doc.fontSize(10)
  .text(patient["phoneNumber"], 435, 225);//+textData["prescription"]["bedNo"]
  doc.fontSize(10)
  .text(prescription["complaints"], 10, 300);//+textData["prescription"]["inPatientNo"]
  doc.fontSize(10)
  .text(prescription["observation"], 10, 450);//+textData["prescription"]["unit"]
  doc.fontSize(10)
  .text(prescription["advise"], 10, 560);//+textData["prescription"]["consultant"]
  doc.fontSize(8)
  .text(doctor["fullName"], 425, 675);//+textData["prescription"]["diagnosis"]
  doc.fontSize(8)
  .text(doctor["educationBackground"][0], 400, 690);//+textData["prescription"]["chiefComplaint"]
  
  doc.fontSize(8)
  .text(doctor["NMC_number"], 420, 705);//+textData["prescription"]["historyOfPresentIllness"]
 
  
  
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
 module.exports={generatePdfFunction};