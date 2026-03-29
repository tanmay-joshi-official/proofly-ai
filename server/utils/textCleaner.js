export const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const cleanExplanation = (explanation) => {
  if (!explanation) return '';
  let cleaned = cleanText(explanation);
  if (cleaned.length > 1000) {
    cleaned = cleaned.substring(0, 1000) + '...';
  }
  return cleaned;
};

export const cleanListItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map(item => cleanText(String(item)));
};
