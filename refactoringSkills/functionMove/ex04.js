function rederPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(rdnerPhoto(person.photo));
  result.push(`<p>제목 : ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.joun("\n");
}
