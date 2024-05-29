/* eslint-disable @typescript-eslint/restrict-template-expressions */
const commit = window._env_.GIT_COMMIT
const branch = window._env_.GIT_BRANCH
const author = window._env_.GIT_AUTHOR
const date = window._env_.GIT_DATE
const subject = window._env_.GIT_SUBJECT

const buildInfo = {
  commit,
  branch,
  author,
  date,
  subject,
  info: `${commit}@${branch} by ${author} at ${date}: ${subject}`
}

export default buildInfo
