export default function dealy(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
