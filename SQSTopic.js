class SQSTopic{

    constructor() {
        this.data = null
        this.transactionType = null
        this.sessionId = null
        this.companyId = null
      }

      getTransactionType() {
        return this.transactionType;
      }
    
      setTransactionType(value) {
        this.transactionType = value;
      }

      getData() {
        return this.data;
      }
    
      setData(value) {
        this.data = value;
      }

      getSessionId() {
        return this.sessionId;
      }
    
      setSessionId(value) {
        this.sessionId = value;
      }

      getCompanyId(){
          return this.companyId
      }

      setCompanyId(value){
          this.companyId = value
      }

}

module.exports = SQSTopic