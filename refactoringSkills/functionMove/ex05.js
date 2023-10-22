{
  function renderPerson(outStream, person) {
    outStream.write(`<p>${person.name}</p>\n`);
    renderPhoto(outStream, person.photo);
    emitPhotoData(outStream, person.photo);
  }

  function listRecentPhotos(outStream, photos) {
    photos
      .filter((p) => p.date > recentDateCutoff())
      .forEach((p) => {
        outStream.write("<div>\n");
        emitPhotoData(outStream, p);
        outStream.write("</div>\n");
      });
  }

  function emitPhotoData(outStream, photo) {
    outStream.write(`<p>제목: ${p.title}</p>`);
    outStream.write(`<p>제목: ${photo.date.toString()}</p>`);
    outStream.write(`<p>제목: ${photo.location}</p>`);
  }
}
////////////////////

function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
  // 👉 emitPhotoData()에서 사용하던 부분을 추출하여 사용
  outStream.write(`<p>제목: ${person.photo.location}</p>`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      emitPhotoData(outStream, p);
      outStream.write(`<p>제목: ${p.location}</p>`);
      outStream.write("</div>\n");
    });
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${p.title}</p>`);
  outStream.write(`<p>제목: ${photo.date.toString()}</p>`);
  // outStream.write(`<p>제목: ${photo.location}</p>`); 💬 추출 되었음
}
