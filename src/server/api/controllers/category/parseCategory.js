/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { category } = request.body;
  
    // validate if we have a  in the body
    if (category == null) {
      throw new Error('The category object was not set.');
    }
  
    // return the parsed
    return category;
  }