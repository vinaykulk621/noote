const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  const item = document.createElement("li");
  const message = document.createElement("pre");
  message.textContent = msg.msg;
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.onclick = function () {
    socket.emit("delete message", msg.id);
  };
  item.appendChild(message);
  item.appendChild(button);
  item.id = msg.id;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("message deleted", function (id) {
  const message = document.getElementById(id);
  if (message) {
    message.parentNode.removeChild(message);
  }
});
