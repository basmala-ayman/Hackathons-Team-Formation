class AppError extends Error {
  constructor(message, statusCode) {
    super(message); 
    this.statusCode = statusCode;
    
    //this one its role is to manage and handle and organize the errors 
    //so do not dealing with all errors in the same way not dealing woth normal error that user makes as bug that can ruin the server and may need action
    //so that helps to can classify 
    this.isOperational=true;

    //this is for printing the stack steps and to make the debugging more easier 
    Error.captureStackTrace(this,this.constructor);
  };
};

module.exports = AppError;