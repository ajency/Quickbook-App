class Response{

    constructor(statusCode,message,data) {
        // invokes the setter
        this.statusCode = statusCode;
        this.message = message
        this.data = data
      }

      getStatusCode() {
        return this.statusCode;
      }
    
      setStatusCode(value) {
        this.statusCode = value;
      }

      getMessage() {
        return this.message;
      }
    
      setMessage(value) {
        this.message = value;
      }

      getData() {
        return this.data;
      }
    
      setData(value) {
        this.data = value;
      }

}

module.exports = Response