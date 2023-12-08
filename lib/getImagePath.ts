const getImagePath = (imagePath?: string, fullSize?: boolean) => {
  return `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/${
    imagePath || "placeholder"
  }`;
};

export default getImagePath;
