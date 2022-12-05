const sleep = (delay: number = 1000) =>
  new Promise((r) => setTimeout(r, delay));
export default sleep;