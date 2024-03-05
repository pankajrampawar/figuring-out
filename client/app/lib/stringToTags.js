export default function stringToTags(inputString) {
    const words = inputString.split(' ');
  
    const tags = [];
  
    words.forEach(word => {
      tags.push(word);
    });
  
    return tags;
}
  