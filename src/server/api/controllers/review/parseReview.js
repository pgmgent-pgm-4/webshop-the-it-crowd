/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { review } = request.body;
  
    // validate if we have a  in the body
    if (review == null) {
      throw new Error('The review object was not set.');
    }
  
    // return the parsed
    return review;
  }