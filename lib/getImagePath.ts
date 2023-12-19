const getImagePath = (imagePath?: string, fullSize?: boolean) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/${imagePath}`
    : "https://links.papareact.com/o8z";
};

export default getImagePath;
