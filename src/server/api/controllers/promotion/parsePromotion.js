/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { promotion } = request.body;
  
    // validate if we have a  in the body
    if (promotion == null) {
      throw new Error('The promotion object was not set.');
    }
  
    // return the parsed
    return promotion;
  }