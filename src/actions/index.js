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

// export function updateCanvasDimensions(canvas){
//   return {
//     type: "UPDATE_CANVAS_DIMENSIONS",
//     canvas
//   }
// }
