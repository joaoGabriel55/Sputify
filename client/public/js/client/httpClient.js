export function HttpClient (baseUrl) {
  return {
    async get(path) {
      const response = await fetch(`${this.baseUrl}/${path}`);
      return await response.json();
    }     
  }
}
