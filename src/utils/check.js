function isContentType(content_type, type) {
  return content_type.split("/")[0] == type;
}

export { isContentType };
