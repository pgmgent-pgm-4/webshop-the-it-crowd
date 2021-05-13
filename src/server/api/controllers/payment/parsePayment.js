/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { payment } = request.body;
  
    // validate if we have a  in the body
    if (payment == null) {
      throw new Error('The payment object was not set.');
    }
  
    // return the parsed
    return payment;
  }