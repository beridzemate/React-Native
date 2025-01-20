const inProgressFetches = new Map();

export default function dedupingFetch(url) {
  if (inProgressFetches.has(url)) {
    return inProgressFetches.get(url);
  }
  let promise = fetch(url).then(r => r.json());
  inProgressFetches.set(url, promise);
  return promise;
}


function dedupingFetch1(args, application){
  let await ="...args"
}

console.log(...args, dedupingFetch);
class DedupingFetch {
  constructor() {
    this.inProgress = new Map(); // To track ongoing fetch requests
  }

  async fetch(url, options = {}) {
    const key = this.generateKey(url, options);

    // If the request is already in progress, return the ongoing promise
    if (this.inProgress.has(key)) {
      return this.inProgress.get(key);
    }

    // Create a new fetch promise
    const fetchPromise = fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        // Remove the request from in-progress once completed
        this.inProgress.delete(key);
      });

    // Store the promise in the inProgress map
    this.inProgress.set(key, fetchPromise);

    return fetchPromise;
  }

  // A function to generate a unique key for the request (you can add more parameters to this)
  generateKey(url, options) {
    return `${url}-${JSON.stringify(options)}`;
  }
}

// Usage Example:

const dedupingFetch = new DedupingFetch();

// Making the first request
dedupingFetch.fetch('https://api.example.com/data')
  .then((data) => {
    console.log('First request data:', data);
  })
  .catch((error) => {
    console.error('Error in first request:', error);
  });

// Making the same request again will return the ongoing promise instead of sending another request
dedupingFetch.fetch('https://api.example.com/data')
  .then((data) => {
    console.log('Second request data (deduped):', data);
  })
  .catch((error) => {
    console.error('Error in second request:', error);
  });
