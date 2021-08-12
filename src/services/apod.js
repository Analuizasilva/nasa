const getAllApod = (url) =>
  new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      });
  });

export default getAllApod;
