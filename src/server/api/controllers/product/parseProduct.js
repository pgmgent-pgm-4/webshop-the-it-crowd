/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { product } = request.body;
  
    // validate if we have a  in the body
    if (product == null) {
      throw new Error('The discount object was not set.');
    }
  
    // return the parsed
    return product;
  }