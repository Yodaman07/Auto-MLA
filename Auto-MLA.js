function onOpen(e) {
  var ui = DocumentApp.getUi()
  ui.createMenu("Auto-MLA")
  .addItem("Format doc", "format")
  .addSubMenu(ui.createMenu("Configure")
  .addItem("Name", "configName")
  .addItem("Teacher", "configTeacher")
  .addItem("Class", "configClass"))
  .addItem("About", "about")
  .addToUi()

}

function format(){
  var doc = DocumentApp.getActiveDocument()
  var id = doc.getId()

  var name = ScriptProperties.getProperty("Name")
  var teacher = ScriptProperties.getProperty("Teacher")
  var classes = ScriptProperties.getProperty("Class")

  var date = new Date()
  var monthNum = date.getMonth()
  var day = date.getDate()
  var yr = date.getFullYear()
  var month = new Date(yr, monthNum, day).toLocaleString("default", {month:"long"})
  var currentDay = month + " " + day + ", " + yr


  doc.getBody().editAsText().setFontSize(12)
  doc.getBody().editAsText().setFontFamily("Times New Roman")
  
  
  doc.getBody().clear().insertParagraph(0, name + "\
  \n" + teacher +"\
  \n" + classes + "\
  \n" + currentDay).setLineSpacing(2)

  doc.addHeader().appendParagraph(name.split(" ")[1] + " *NUM*").setAlignment(DocumentApp.HorizontalAlignment.RIGHT)

  doc.getBody().appendParagraph("ESSAY NAME").setAlignment(DocumentApp.HorizontalAlignment.CENTER)

  var start = doc.getBody().appendParagraph("*").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(2)
  var pos = doc.newPosition(start, 1)
  doc.setCursor(pos)

  doc.saveAndClose()
  DocumentApp.openById(id)
}

function configName(){
  var ui = DocumentApp.getUi()
  var name = ScriptProperties.getProperty("Name")

  var response = ui.prompt("Set your name here", "Name is currently set to: " + name, ui.ButtonSet.OK_CANCEL)
  if (response.getSelectedButton() == ui.Button.OK){
    ScriptProperties.setProperty("Name",response.getResponseText())
  }
}

function configTeacher(){
  var ui = DocumentApp.getUi()
  var teacher = ScriptProperties.getProperty("Teacher")
  
  var response = ui.prompt("Set your teacher here", "Teacher is currently set to: " + teacher, ui.ButtonSet.OK_CANCEL)
  if (response.getSelectedButton() == ui.Button.OK){
    ScriptProperties.setProperty("Teacher",response.getResponseText())
  }
}

function configClass(){
  var ui = DocumentApp.getUi()
  var classes = ScriptProperties.getProperty("Class")
  
  var response = ui.prompt("Set your class here", "Class is currently set to: " + classes, ui.ButtonSet.OK_CANCEL)
  if (response.getSelectedButton() == ui.Button.OK){
    ScriptProperties.setProperty("Class",response.getResponseText())
  }
}


function about(){
  var ui = DocumentApp.getUi()
  ui.alert("About this script", "Auto-MLA is a formatting tool made by Ayaan Irshad to help with formatting documents", ui.ButtonSet.OK)
}