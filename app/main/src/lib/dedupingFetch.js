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