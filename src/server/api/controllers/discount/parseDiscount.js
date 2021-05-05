/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { discount } = request.body;
  
    // validate if we have a  in the body
    if (discount == null) {
      throw new Error('The discount object was not set.');
    }
  
    // return the parsed
    return discount;
  }