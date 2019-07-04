let API_URL;

process.env.NODE_ENV === "development"
  ? (API_URL = "http://localhost:3001/api")
  : (API_URL = "http://matfyz.sk:3001/api");

export const fetchCreateNewQuestion = () => {
  return `${API_URL}/createNewQuestion`;
};

export const fetchTopics = () => {
  return `${API_URL}/topics`;
};

export const fetchQuestionTypes = () => {
  return `${API_URL}/questionTypes`;
};
