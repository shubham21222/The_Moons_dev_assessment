// API functions implementation
const fetchCoinData = async () => {
    try {
      // Make an HTTP GET request to the API endpoint
      const response = await fetch('api_link');
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        // If not successful, throw an error with the status text
        throw new Error('Failed to fetch coin data: ' + response.statusText);
      }
  
      // Parse the response body as JSON
      const data = await response.json();
  
      // Return the parsed JSON data
      return data;
    } catch (error) {
      // If an error occurs, throw an error with a custom message
      throw new Error('Failed to fetch coin data: ' + error.message);
    }
  };
  
  export default { fetchCoinData };
  