export default {
  prompt: "Hello World",
  action: () => helloWorld(),
};

function helloWorld() {
  return `Hello World from Lambda`;
}
