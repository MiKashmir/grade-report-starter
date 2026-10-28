// Формування відомості успішності групи
// Написано кілька років тому, працює, тестів немає.
function buildReport(data, opts) {
  var reportText = "";
  var failedStudents = [];
  reportText += "Відомість успішності\n";
  reportText += "Група: " + data.group + "\n";
  reportText += "------------------------------\n";
  var totalSum = 0;
  var studentCount = 0;
  for (var i = 0; i < data.students.length; i++) {
    var s = data.students[i];
    var sumGrades = 0;
    for (var j = 0; j < s.grades.length; j++) {
      sumGrades = sumGrades + s.grades[j];
    }
    var avgGrade = 0;
    if (s.grades.length > 0) {
      avgGrade = sumGrades / s.grades.length;
    }
    var gradeName = "";
    if (avgGrade >= 4.5) {
      gradeName = "відмінно";
    } else {
      if (avgGrade >= 3.5) {
        gradeName = "добре";
      } else {
        if (avgGrade >= 2.5) {
          gradeName = "задовільно";
        } else {
          gradeName = "незадовільно";
        }
      }
    }
    var line = "";
    if (opts && opts.short) {
      line = s.name.split(" ")[0] + " " + s.name.split(" ")[1][0] + ". — " + avgGrade.toFixed(1) + " (" + gradeName + ")";
    } else {
      line = s.name + " — " + avgGrade.toFixed(1) + " (" + gradeName + ")";
    }
    if (avgGrade < 2.5) {
      line = line + " [!]";
      failedStudents.push(s.name);
    }
    reportText += line + "\n";
    totalSum = totalSum + avgGrade;
    studentCount = studentCount + 1;
  }
  reportText += "------------------------------\n";
  var avg = 0;
  if (studentCount > 0) {
    avg = totalSum / studentCount;
  }
  var groupAverageName = "";
  if (avg >= 4.5) {
    groupAverageName = "відмінно";
  } else {
    if (avg >= 3.5) {
      groupAverageName = "добре";
    } else {
      if (avg >= 2.5) {
        groupAverageName = "задовільно";
      } else {
        groupAverageName = "незадовільно";
      }
    }
  }
  reportText += "Середній бал групи: " + avg.toFixed(1) + " (" + groupAverageName + ")\n";
  if (failedStudents.length > 0) {
    reportText += "Потребують уваги: " + failedStudents.join(", ") + "\n";
  } else {
    reportText += "Потребують уваги: немає\n";
  }
  return reportText;
}

function getGradeName(score) {
  if (score >= 4.5) return "відмінно";
  if (score >= 3.5) return "добре";
  if (score >= 2.5) return "задовільно";
  return "незадовільно";
}

module.exports = { buildReport };
