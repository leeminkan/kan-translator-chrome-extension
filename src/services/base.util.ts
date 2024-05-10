export const getAsync = async <T>(url: string) => {
  let response = await fetch(url, {
    referrerPolicy: "no-referrer",
    credentials: "omit",
  });

  if (!response.ok) {
    throw {
      code: response.status,
      message: response.statusText,
    };
  }

  return (await response.json()) as T;
};
