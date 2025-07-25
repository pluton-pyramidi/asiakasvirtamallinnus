export const cleanComponent = (divComponent) => {
  while (divComponent.firstChild) {
    divComponent.removeChild(divComponent.firstChild);
  }
};

export const replaceComponent = (divComponent, chartSvg) => {
  cleanComponent(divComponent);
  divComponent.append(chartSvg);
};

export const fetchComponentData = async (url) => {
  return new Promise((resolve) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (loadedData) {
        resolve(loadedData);
      });
  });
};
