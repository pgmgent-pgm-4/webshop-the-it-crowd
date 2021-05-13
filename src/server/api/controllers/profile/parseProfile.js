/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { profile } = request.body;
  
    // validate if we have a  in the body
    if (profile == null) {
      throw new Error('The profile object was not set.');
    }
  
    // return the parsed
    return profile;
  }