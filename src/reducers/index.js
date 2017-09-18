let defaultState = {

};

let mainReducer = (state = defaultState, action) => {
  switch(action.type) {
    case "CLICK_IDEABOX":
      alert("You clicked the Ideabox");
      return {
        ...state
      };
    case "SET_CANVAS_CONTEXT":
      console.log("canvas context set");
      console.log(action.context);
      return{
        ...state,
        context: action.context
      };
    default:
      return state;
  }
}

export default mainReducer;
