module.exports = function (fileDirectory, multer) {
  const multipartParser = multer({
    dest: fileDirectory,
  }).any()

  return multipartParser
}
