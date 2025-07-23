// class for handling API errors
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message),
      (this.message = message),
      (this.statusCode = statusCode),
      (this.errors = errors),
      (this.success = false); // error, dont proceed
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      success: this.success,
    };
  }
}

export { ApiError };
