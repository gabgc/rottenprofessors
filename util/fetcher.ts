export const postFetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const getFetcher = (url: string) => fetch(url).then((res) => res.json());
export const putFetcher = (url: string) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
export const deleteFetcher = (url: string) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
