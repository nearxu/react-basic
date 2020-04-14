// error console
const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error("错误报告: ", err);
  }
};

// time console
const timeMiddleware = (store) => (next) => (action) => {
  console.log("time", new Date().getTime());
  next(action);
};
