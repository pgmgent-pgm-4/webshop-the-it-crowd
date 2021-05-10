/**
 * A parser to parse the incoming request
 */

 export default (request, response) => {
    const { Post } = request.body;
  
    // validate if we have a  in the body
    if (Post == null) {
      throw new Error('The user object was not set.');
    }
  
    // return the parsed
    return Post;
  }