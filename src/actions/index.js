export function click() {
  return {
    type: "CLICK_IDEABOX"
  }
}

export function storeCanvasCtxt(context) {
  return {
    type: "SET_CANVAS_CONTEXT",
    context
  }
}
