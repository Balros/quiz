let API_URL;

process.env.NODE_ENV === "development"
  ? (API_URL = "http://localhost:3001/api")
  : (API_URL = "https://courses.matfyz.sk:4431/api");

export const fetchCreateNewQuestion = () => {
  return `${API_URL}/createNewQuestion`;
};

export const fetchTopics = () => {
  return `${API_URL}/topics`;
};

export const fetchQuestionTypes = () => {
  return `${API_URL}/questionTypes`;
};

export const fetchGetQuestionVersions = () => {
  return `${API_URL}/getQuestionVersions/`;
};
export const fetchAddComment = () => {
  return `${API_URL}/addComment`;
};
export const fetchApproveQuestionVersion = () => {
  return `${API_URL}/approveQuestionVersion`;
};
export const fetchGetQuestions = () => {
  return `${API_URL}/getQuestions`;
};
export const fetchGetQuizAssignment = () => {
  return `${API_URL}/getQuizAssignment/`;
};
export const fetchGetAgents = () => {
  return `${API_URL}/getAgents`;
};
export const fetchCreateQuizAssignment = () => {
  return `${API_URL}/createQuizAssignment`;
};
export const fetchCreateQuestionAssignment = () => {
  return `${API_URL}/createQuestionAssignment`;
};
export const fetchQuizAssignments = () => {
  return `${API_URL}/quizAssignments`;
};
export const fetchGetQuestionAssignment = () => {
  return `${API_URL}/getQuestionAssignment/`;
};
export const fetchTopicsToCreateModifyQuestionAssignment = () => {
  return `${API_URL}/topicsToCreateModifyQuestionAssignment`;
};
export const fetchCreateTopic = () => {
  return `${API_URL}/createTopic`;
};
export const fetchQuestionGroups = () => {
  return `${API_URL}/questionGroups`;
};
export const fetchGetQuizTake = () => {
  return `${API_URL}/getQuizTake/`;
};
export const fetchGenerateQuizTake = () => {
  return `${API_URL}/generateQuizTake/`;
};
export const fetchSubmitQuizTake = () => {
  return `${API_URL}/submitQuizTake`;
};
export const fetchSubmitReview = () => {
  return `${API_URL}/submitReview`;
};
