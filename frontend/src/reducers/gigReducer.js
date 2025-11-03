  export const initialState = {
    userId: "",
    title: "",
    category: "design",
    cover: "",
    images: [],
    description: "",
    shortTitle: "",
    shortDescription: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
  };



export const gigReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ID": {
      return {
        ...state,
        userId: action.payload,
      };
    }

    case "CHANGE_INPUT": {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case "ADD_IMAGES": {
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    }
    case "ADD_FEATURES": {
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    }
    case "REMOVE_FEATURES": {
      return {
        ...state,
        features: state.features.filter((item) => item !== action.payload),
      };
    }

    default:
      return state;
  }
};
