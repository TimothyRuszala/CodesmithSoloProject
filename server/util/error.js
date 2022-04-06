function createErr(log, message, status) {
  const err = {
    log,
    message: { err: message }
  };
  if (status) err.status = status;
  return err;
}

module.exports = createErr;