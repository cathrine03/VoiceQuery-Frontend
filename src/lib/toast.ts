export function showToast(
  message: string
) {
  const div =
    document.createElement("div");

  div.innerText = message;

  div.className =
    "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2000);
}