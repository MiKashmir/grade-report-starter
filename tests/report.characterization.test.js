const { buildReport } = require("../src/report");
const fs = require("fs");

const groupData = JSON.parse(fs.readFileSync("tests/fixtures/group.json", "utf8"));
const emptyGroup = { group: "Empty", students: [] };
const noGradesStudent = { group: "Test", students: [{ name: "No Grades", grades: [] }] };

describe("Characterization tests for buildReport", () => {
  test("повна відомість", () => expect(buildReport(groupData, {})).toMatchSnapshot());
  test("скорочена відомість", () => expect(buildReport(groupData, { short: true })).toMatchSnapshot());
  test("порожня група", () => expect(buildReport(emptyGroup)).toMatchSnapshot());
  test("дивність: студент без оцінок", () => expect(buildReport(noGradesStudent)).toMatchSnapshot());
  test("opts is undefined", () => expect(buildReport(groupData)).toMatchSnapshot());
});