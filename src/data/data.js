export const loadTopics = [
  { id: "0", topic_name: "topic1", path: "path1" },
  { id: "1", topic_name: "topic2", path: "path2" }
]; //TODO edit to use database
export const loadMultipleAnswer = [
  { id: "40", question_id: "7", answer_text: "multichoice1", correct: "1" },
  { id: "41", question_id: "7", answer_text: "multichoice2", correct: "0" },
  { id: "42", question_id: "7", answer_text: "multichoice3", correct: "0" }
];
export const loadSingleAnswer = [
  { id: "37", question_id: "5", answer_text: "asdf", correct: "1" }
];
export const loadQuestionGroups = [
  { id: "0" },
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  { id: "11" },
  { id: "12" }
];
export const loadAnswers = [
  { id: "37", question_id: "5", answer_text: "asdf", correct: "1" },
  { id: "38", question_id: "6", answer_text: "devet", correct: "1" },
  { id: "39", question_id: "6", answer_text: "tri", correct: "0" },
  { id: "40", question_id: "7", answer_text: "multichoice1", correct: "1" },
  { id: "41", question_id: "7", answer_text: "multichoice2", correct: "0" },
  { id: "42", question_id: "7", answer_text: "multichoice3", correct: "0" },
  { id: "43", question_id: "8", answer_text: "devet", correct: "1" },
  { id: "44", question_id: "9", answer_text: "desat", correct: "1" },
  { id: "45", question_id: "16", answer_text: "0", correct: "1" },
  { id: "46", question_id: "17", answer_text: "0", correct: "1" },
  { id: "47", question_id: "16", answer_text: "0", correct: "1" },
  {
    id: "49",
    question_id: "22",
    answer_text: "otazka multiple vsetko",
    correct: "0"
  },
  { id: "48", question_id: "20", answer_text: "add_answer2", correct: "1" },
  {
    id: "50",
    question_id: "22",
    answer_text: "otazka multiple vsetko2",
    correct: "0"
  },
  {
    id: "51",
    question_id: "23",
    answer_text: "otazka multiple vsetko",
    correct: "0"
  },
  {
    id: "52",
    question_id: "23",
    answer_text: "otazka multiple vsetko2",
    correct: "0"
  },
  { id: "53", question_id: "24", answer_text: "hola hola", correct: "1" },
  { id: "54", question_id: "24", answer_text: "bambucha", correct: "0" },
  {
    id: "55",
    question_id: "23",
    answer_text: "otazka multiple vsetko",
    correct: "0"
  },
  {
    id: "56",
    question_id: "23",
    answer_text: "otazka multiple vsetko2",
    correct: "1"
  },
  {
    id: "57",
    question_id: "23",
    answer_text: "otazka multiple vsetko3",
    correct: "0"
  },
  {
    id: "58",
    question_id: "23",
    answer_text: "otazka multiple vsetko",
    correct: "0"
  },
  {
    id: "59",
    question_id: "23",
    answer_text: "otazka multiple vsetko2",
    correct: "0"
  },
  {
    id: "60",
    question_id: "23",
    answer_text: "otazka multiple vsetko",
    correct: "0"
  },
  {
    id: "61",
    question_id: "23",
    answer_text: "otazka multiple vsetko2",
    correct: "1"
  },
  {
    id: "62",
    question_id: "23",
    answer_text: "otazka multiple vsetko3",
    correct: "0"
  },
  { id: "63", question_id: "23", answer_text: "devd", correct: "0" }
]; //TODO edit to use database
export const loadQuestionTypes = [
  { id: "1", question_type: "Text" },
  { id: "2", question_type: "Checkbox" }
]; //TODO edit to use database
export const loadQuestions = [
  {
    ID: "5",
    user_id: "22",
    title: "title",
    text: "topic 2",
    question_group_id: "5",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-09-29 15:23:09",
    time_modified: "2018-09-29 15:23:09"
  },
  {
    ID: "6",
    user_id: "22",
    title: "title",
    text: "otazka checkbox",
    question_group_id: "6",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-09-30 18:48:32",
    time_modified: "2018-09-30 18:48:32"
  },
  {
    ID: "7",
    user_id: "22",
    title: "title",
    text: "multichoice",
    question_group_id: "7",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-01 11:20:43",
    time_modified: "2018-10-01 11:20:43"
  },
  {
    ID: "25",
    user_id: "22",
    title: "title",
    text: "multicho",
    question_group_id: "7",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-01 11:20:43",
    time_modified: "2018-10-01 11:20:43"
  },
  {
    ID: "26",
    user_id: "22",
    title: "title",
    text: "multi",
    question_group_id: "7",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-01 11:20:43",
    time_modified: "2018-10-01 11:20:43"
  },
  {
    ID: "8",
    user_id: "22",
    title: "title",
    text: "neviem",
    question_group_id: "8",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-02 14:30:50",
    time_modified: "2018-10-02 14:30:50"
  },
  {
    ID: "9",
    user_id: "22",
    title: "title",
    text: "desat",
    question_group_id: "9",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-02 14:35:49",
    time_modified: "2018-10-02 14:35:49"
  },
  {
    ID: "10",
    user_id: "22",
    title: "title",
    text: "text checkboxovej otazky",
    question_group_id: "10",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-04 00:40:10",
    time_modified: "2018-10-04 00:40:10"
  },
  {
    ID: "11",
    user_id: "22",
    title: "title",
    text: "ach",
    question_group_id: "11",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-04 11:31:41",
    time_modified: "2018-10-04 11:31:41"
  },
  {
    ID: "12",
    user_id: "22",
    title: "title",
    text: "aaaa",
    question_group_id: "12",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-04 11:32:26",
    time_modified: "2018-10-04 11:32:26"
  },
  {
    ID: "13",
    user_id: "22",
    title: "title",
    text: "hue hue",
    question_group_id: "13",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-04 11:45:43",
    time_modified: "2018-10-04 11:45:43"
  },
  {
    ID: "14",
    user_id: "22",
    title: "title",
    text: "aaaaaaa",
    question_group_id: "14",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-09 15:48:12",
    time_modified: "2018-10-09 15:48:12"
  },
  {
    ID: "15",
    user_id: "22",
    title: "title",
    text: "baram baram buc",
    question_group_id: "15",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-09 16:19:26",
    time_modified: "2018-10-09 16:19:26"
  },
  {
    ID: "16",
    user_id: "22",
    title: "title",
    text: "otazka refactor haha funguje",
    question_group_id: "16",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-14 14:15:34",
    time_modified: "2018-10-14 16:45:50"
  },
  {
    ID: "21",
    user_id: "22",
    title: "title",
    text: "otazka multiple vsetko",
    question_group_id: "21",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-16 13:55:00",
    time_modified: "2018-10-16 13:55:00"
  },
  {
    ID: "20",
    user_id: "22",
    title: "title",
    text: "add_answer",
    question_group_id: "20",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "1",
    time_created: "2018-10-15 12:07:37",
    time_modified: "2018-10-15 14:14:24"
  },
  {
    ID: "22",
    user_id: "22",
    title: "title",
    text: "otazka multiple vsetko",
    question_group_id: "22",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-16 14:08:40",
    time_modified: "2018-10-16 14:08:40"
  },
  {
    ID: "23",
    user_id: "22",
    title: "title",
    text: "otazka multiple vsetko",
    question_group_id: "23",
    topic_id: "2",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-16 14:09:07",
    time_modified: "2018-10-19 01:24:32"
  },
  {
    ID: "24",
    user_id: "22",
    title: "title",
    text: "bum ca rara",
    question_group_id: "24",
    topic_id: "1",
    approved: "0",
    active: "1",
    attempt_num: "0",
    success_num: "0",
    question_types_id: "2",
    time_created: "2018-10-18 23:01:43",
    time_modified: "2018-10-18 23:01:43"
  }
]; //TODO edit to use database
