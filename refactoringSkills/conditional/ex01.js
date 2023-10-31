function plumages(birds) {
  // [key, value]
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}
